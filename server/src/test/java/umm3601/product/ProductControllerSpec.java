package umm3601.product;

import static com.mongodb.client.model.Filters.eq;
import static io.javalin.plugin.json.JsonMapperKt.JSON_MAPPER_KEY;
import static java.util.Map.entry;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
// import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.javalin.core.JavalinConfig;
import io.javalin.core.validation.ValidationException;
import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.HandlerType;
import io.javalin.http.HttpCode;
import io.javalin.http.NotFoundResponse;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJackson;

@SuppressWarnings({ "MagicNumber" })
public class ProductControllerSpec {

  private MockHttpServletRequest mockReq = new MockHttpServletRequest();
  private MockHttpServletResponse mockRes = new MockHttpServletResponse();

  // An instance of the controller we're testing that is prepared in
  // `setupEach()`, and then exercised in the various tests below.
  private ProductController productController;

  private ObjectId testId;

  // The client and database that will be used
  // for all the tests in this spec file.
  private static MongoClient mongoClient;
  private static MongoDatabase db;

  // Used to translate between JSON and POJOs.
  private static JavalinJackson javalinJackson = new JavalinJackson();

  /**
   * Sets up (the connection to the) DB once; that connection and DB will
   * then be (re)used for all the tests, and closed in the `teardown()`
   * method. It's somewhat expensive to establish a connection to the
   * database, and there are usually limits to how many connections
   * a database will support at once. Limiting ourselves to a single
   * connection that will be shared across all the tests in this spec
   * file helps both speed things up and reduce the load on the DB
   * engine.
   */
  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
        MongoClientSettings.builder()
            .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
            .build()
    );
    db = mongoClient.getDatabase("test");
  }

  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @BeforeEach
  public void setupEach() throws IOException {
    // Reset our mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();

    // Setup database
    MongoCollection<Document> productDocuments = db.getCollection("products");
    productDocuments.drop();
    List<Document> testProducts = new ArrayList<>();
    testProducts.add(
        new Document()
            .append("name", "Apple")
            .append("description", "these are the apples i like.")
            .append("brand", "UMM")
            .append("category", "fruit")
            .append("store", "Apple Store")
            .append("location", "here")
            .append("notes", "These are good apples.")
            .append("lifespan", 6)
            .append("threshold", 10));
    testProducts.add(
        new Document()
            .append("name", "Grapes")
            .append("description", "these are the grapes i like.")
            .append("brand", "Generic")
            .append("category", "fruit")
            .append("store", "Grape Store")
            .append("location", "there")
            .append("notes", "These are good grapes.")
            .append("lifespan", 14)
            .append("threshold", 10));
    testProducts.add(
        new Document()
            .append("name", "Potatoes")
            .append("description", "I like these potatoes.")
            .append("brand", "Conner's Potatoes")
            .append("category", "produce")
            .append("store", "Farmer's Market")
            .append("location", "everywhere")
            .append("notes", "We love Conner's Potatoes!")
            .append("lifespan", 45)
            .append("threshold", 10));
    testId = new ObjectId();
    Document test = new Document()
        .append("_id", testId)
        .append("name", "Test")
        .append("description", "testing")
        .append("store", "testing")
        .append("brand", "Test")
        .append("notes", "We love tests");

    productDocuments.insertMany(testProducts);
    productDocuments.insertOne(test);

    productController = new ProductController(db);
  }

  /**
   * Construct an instance of `Context` using `ContextUtil`, providing
   * a mock context in Javalin. See `mockContext(String, Map)` for
   * more details.
   */
  private Context mockContext(String path) {
    return mockContext(path, Collections.emptyMap());
  }

  /**
   * Construct an instance of `Context` using `ContextUtil`, providing a mock
   * context in Javalin. We need to provide a couple of attributes, which is
   * the fifth argument, which forces us to also provide the (default) value
   * for the fourth argument. There are two attributes we need to provide:
   *
   *   - One is a `JsonMapper` that is used to translate between POJOs and JSON
   *     objects. This is needed by almost every test.
   *   - The other is `maxRequestSize`, which is needed for all the ADD requests,
   *     since `ContextUtil` checks to make sure that the request isn't "too big".
   *     Those tests fails if you don't provide a value for `maxRequestSize` for
   *     it to use in those comparisons.
   */
  private Context mockContext(String path, Map<String, String> pathParams) {
    return ContextUtil.init(
        mockReq, mockRes,
        path,
        pathParams,
        HandlerType.INVALID,
        Map.ofEntries(
          entry(JSON_MAPPER_KEY, javalinJackson),
          entry(ContextUtil.maxRequestSizeKey,
                new JavalinConfig().maxRequestSize
          )
        )
      );
  }

  /**
   * A little helper method that assumes that the given context
   * body contains an array of Products, and extracts and returns
   * that array.
   *
   * @param ctx the `Context` whose body is assumed to contain
   *  an array of `Product`s.
   * @return the array of `Product`s from the given `Context`.
   */
  private Product[] returnedProducts(Context ctx) {
    String result = ctx.resultString();
    Product[] products = javalinJackson.fromJsonString(result, Product[].class);
    return products;
  }

  /**
   * A little helper method that assumes that the given context
   * body contains a *single* Product, and extracts and returns
   * that Product.
   *
   * @param ctx the `Context` whose body is assumed to contain
   *  a *single* `Product`.
   * @return the `Product` extracted from the given `Context`.
   */
  private Product returnedSingleProduct(Context ctx) {
    String result = ctx.resultString();
    Product product = javalinJackson.fromJsonString(result, Product.class);
    return product;
  }


  @Test
  public void canGetAllProducts() throws IOException {

    String path = "api/products";
    Context ctx = mockContext(path);

    productController.getProducts(ctx);
    Product[] returnedProducts = returnedProducts(ctx);

    // The response status should be 200, i.e., our request
    // was handled successfully (was OK). This is a named constant in
    // the class HttpCode.
    assertEquals(HttpCode.OK.getStatus(), mockRes.getStatus());
    assertEquals(
      db.getCollection("products").countDocuments(),
      returnedProducts.length
    );
  }

  @Test
  public void canGetProductWithExistingId() throws IOException {
    String testID = testId.toHexString();
    Context ctx = mockContext("api/products/{id}", Map.of("id", testID));

    productController.getProduct(ctx);
    Product resultProduct = returnedSingleProduct(ctx);

    assertEquals(HttpURLConnection.HTTP_OK, mockRes.getStatus());
    assertEquals(testId.toHexString(), resultProduct._id);
    assertEquals("Test", resultProduct.name);
  }

  @Test
  public void getProductWithBadId() throws IOException {
    Context ctx = mockContext("api/products/{id}", Map.of("id", "bad"));

    assertThrows(BadRequestResponse.class, () -> {
      productController.getProduct(ctx);
    });
  }

  @Test
  public void getProductWithNonexistentId() throws IOException {
    Context ctx = mockContext("api/products/{id}", Map.of("id", "58af3a600343927e48e87335"));

    assertThrows(NotFoundResponse.class, () -> {
      productController.getProduct(ctx);
    });
  }

  @Test
  public void canGetProductWithNameApple() throws IOException {

    mockReq.setQueryString("name=Apple");
    String path = "api/products";
    Context ctx = mockContext(path);

    productController.getProducts(ctx);
    Product[] returnedProducts = returnedProducts(ctx);

    // The response status should be 200, i.e., our request
    // was handled successfully (was OK). This is a named constant in
    // the class HttpCode.
    assertEquals(HttpCode.OK.getStatus(), mockRes.getStatus());
    assertEquals(1, returnedProducts.length);
  }

  @Test
  public void addProduct() throws IOException {

    String testNewProduct = "{"
        + "\"name\": \"Turkey - XXL\","
        + "\"description\": \"Homegrown Morris Turkey\","
        + "\"brand\": \"The CSCI Dungeon\","
        + "\"category\": \"meat\","
        + "\"store\": \"Willie's\","
        + "\"location\": \"Meat Market\","
        + "\"notes\": \"Don't eat the turkey Nic McPhee\","
        + "\"lifespan\": 10,"
        + "\"threshold\": 10"
        + "}";
    mockReq.setBodyContent(testNewProduct);
    mockReq.setMethod("POST");

    Context ctx = mockContext("api/products");

    productController.addNewProduct(ctx);
    String result = ctx.resultString();
    String id = javalinJackson.fromJsonString(result, ObjectNode.class).get("id").asText();

    // Our status should be 201, i.e., our new product was successfully
    // created. This is a named constant in the class HttpURLConnection.
    assertEquals(HttpURLConnection.HTTP_CREATED, mockRes.getStatus());

    // Successfully adding the product should return the newly generated MongoDB ID
    // for that product.
    assertNotEquals("", id);
    assertEquals(1, db.getCollection("products").countDocuments(eq("_id", new ObjectId(id))));

    // Verify that the product was added to the database with the correct ID
    Document addedProduct = db.getCollection("products").find(eq("_id", new ObjectId(id))).first();

    assertNotNull(addedProduct);
    assertEquals("Turkey - XXL", addedProduct.getString("name"));
    assertEquals("Homegrown Morris Turkey", addedProduct.getString("description"));
    assertEquals("The CSCI Dungeon", addedProduct.getString("brand"));
    assertEquals("meat", addedProduct.getString("category"));
    assertEquals("Willie's", addedProduct.getString("store"));
    assertEquals("Meat Market", addedProduct.getString("location"));
    assertEquals("Don't eat the turkey Nic McPhee", addedProduct.getString("notes"));
    assertEquals(10, addedProduct.getInteger("lifespan"));
    assertEquals(10, addedProduct.getInteger("threshold"));
  }

  @Test
  public void addNullNameProduct() throws IOException {
    String testNewProduct = "{"
        + "\"description\": \"Homegrown Morris Turkey\","
        + "\"brand\": \"The CSCI Dungeon\","
        + "\"category\": \"meat\","
        + "\"store\": \"Willie's\","
        + "\"location\": \"Meat Market\","
        + "\"notes\": \"Don't eat the turkey Nic McPhee\","
        + "\"lifespan\": 10,"
        + "\"threshold\": 10"
        + "}";
    mockReq.setBodyContent(testNewProduct);
    mockReq.setMethod("POST");

    Context ctx = mockContext("api/products");

    assertThrows(ValidationException.class, () -> {
      productController.addNewProduct(ctx);
    });
  }

  @Test
  public void addNullStoreProduct() throws IOException {
    String testNewProduct = "{"
        + "\"name\": \"Turkey - XXL\","
        + "\"description\": \"Homegrown Morris Turkey\","
        + "\"brand\": \"The CSCI Dungeon\","
        + "\"category\": \"meat\","
        + "\"location\": \"Meat Market\","
        + "\"notes\": \"Don't eat the turkey Nic McPhee\","
        + "\"lifespan\": 10,"
        + "\"threshold\": 10"
        + "}";
    mockReq.setBodyContent(testNewProduct);
    mockReq.setMethod("POST");

    Context ctx = mockContext("api/products");

    assertThrows(ValidationException.class, () -> {
      productController.addNewProduct(ctx);
    });
  }

  @Test
  public void addNullBrandProduct() throws IOException {
    String testNewProduct = "{"
        + "\"name\": \"Turkey - XXL\","
        + "\"description\": \"Homegrown Morris Turkey\","
        + "\"category\": \"meat\","
        + "\"store\": \"Willie's\","
        + "\"notes\": \"Don't eat the turkey Nic McPhee\","
        + "\"lifespan\": 10,"
        + "\"threshold\": 10"
        + "}";
    mockReq.setBodyContent(testNewProduct);
    mockReq.setMethod("POST");

    Context ctx = mockContext("api/products");

    assertThrows(ValidationException.class, () -> {
      productController.addNewProduct(ctx);
    });
  }

  @Test
  public void addInvalidNameProduct() throws IOException {
    String testNewProduct = "{"
        + "\"name\": \"\","
        + "\"description\": \"Homegrown Morris Turkey\","
        + "\"brand\": \"The CSCI Dungeon\","
        + "\"category\": \"meat\","
        + "\"store\": \"Willie's\","
        + "\"location\": \"Meat Market\","
        + "\"notes\": \"Don't eat the turkey Nic McPhee\""
        + "}";
    mockReq.setBodyContent(testNewProduct);
    mockReq.setMethod("POST");

    Context ctx = mockContext("api/products");

    assertThrows(ValidationException.class, () -> {
      productController.addNewProduct(ctx);
    });
  }

  @Test
  public void addInvalidStoreProduct() throws IOException {
    String testNewProduct = "{"
        + "\"name\": \"Turkey - XXL\","
        + "\"description\": \"Homegrown Morris Turkey\","
        + "\"brand\": \"The CSCI Dungeon\","
        + "\"category\": \"meat\","
        + "\"store\": \"\","
        + "\"location\": \"Meat Market\","
        + "\"notes\": \"Don't eat the turkey Nic McPhee\""
        + "}";
    mockReq.setBodyContent(testNewProduct);
    mockReq.setMethod("POST");

    Context ctx = mockContext("api/products");

    assertThrows(ValidationException.class, () -> {
      productController.addNewProduct(ctx);
    });
  }

  @Test
  public void addInvalidBrandProduct() throws IOException {
    String testNewProduct = "{"
        + "\"name\": \"Turkey - XXL\","
        + "\"description\": \"Homegrown Morris Turkey\","
        + "\"brand\": \"\","
        + "\"category\": \"meat\","
        + "\"store\": \"Willie's\","
        + "\"location\": \"Here\","
        + "\"notes\": \"Don't eat the turkey Nic McPhee\""
        + "}";
    mockReq.setBodyContent(testNewProduct);
    mockReq.setMethod("POST");

    Context ctx = mockContext("api/products");

    assertThrows(ValidationException.class, () -> {
      productController.addNewProduct(ctx);
    });
  }

  @Test
  public void addInvalidLifespanProduct() throws IOException {
    String testNewProduct = "{"
        + "\"name\": \"Turkey - XXL\","
        + "\"description\": \"Homegrown Morris Turkey\","
        + "\"brand\": \"The CSCI Dungeon\","
        + "\"category\": \"meat\","
        + "\"store\": \"Willie's\","
        + "\"location\": \"\","
        + "\"notes\": \"Don't eat the turkey Nic McPhee\","
        + "\"lifespan\": -2,"
        + "\"threshold\": 10"
        + "}";
    mockReq.setBodyContent(testNewProduct);
    mockReq.setMethod("POST");

    Context ctx = mockContext("api/products");

    assertThrows(ValidationException.class, () -> {
      productController.addNewProduct(ctx);
    });
  }

  @Test
  public void addInvalidThresholdProduct() throws IOException {
    String testNewProduct = "{"
        + "\"name\": \"Turkey - XXL\","
        + "\"description\": \"Homegrown Morris Turkey\","
        + "\"brand\": \"The CSCI Dungeon\","
        + "\"category\": \"meat\","
        + "\"store\": \"Willie's\","
        + "\"location\": \"\","
        + "\"notes\": \"Don't eat the turkey Nic McPhee\","
        + "\"lifespan\": 2,"
        + "\"threshold\": -10"
        + "}";
    mockReq.setBodyContent(testNewProduct);
    mockReq.setMethod("POST");

    Context ctx = mockContext("api/products");

    assertThrows(ValidationException.class, () -> {
      productController.addNewProduct(ctx);
    });
  }
}
