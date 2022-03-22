package umm3601.product;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.mongodb.client.MongoDatabase;
// import com.mongodb.client.model.Sorts;
// import com.mongodb.client.result.DeleteResult;

import org.bson.Document;
import org.bson.UuidRepresentation;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import io.javalin.http.HttpCode;

public class ProductController {

  private static final String NAME_KEY = "name";
  //private static final String BRAND_KEY = "brand"; --One Day

  private final JacksonMongoCollection<Product> productCollection;

  public ProductController(MongoDatabase database) {
    productCollection = JacksonMongoCollection.builder().build(
        database,
        "products",
        Product.class,
        UuidRepresentation.STANDARD);
  }

  public void getProduct(Context ctx) {
    String id = ctx.pathParam("id");
    Product product;

    try {
      product = productCollection.find(eq("_id", new ObjectId(id))).first();
    } catch (IllegalArgumentException e) {
      throw new BadRequestResponse("The requested product id wasn't a legal Mongo Object ID.");
    }
    if (product == null) {
      throw new NotFoundResponse("The requested product was not found");
    } else {
      ctx.json(product);
    }
  }

  public void getProducts(Context ctx) {
    Bson combinedFilter = constructFilter(ctx);

    // All three of the find, sort, and into steps happen "in parallel" inside the
    // database system. So MongoDB is going to find the products with the specified
    // properties, return those sorted in the specified manner, and put the
    // results into an initially empty ArrayList.
    ArrayList<Product> matchingProducts = productCollection
      .find(combinedFilter)
      .into(new ArrayList<>());

    // Set the JSON body of the response to be the list of products returned by
    // the database.
    ctx.json(matchingProducts);
  }

  private Bson constructFilter(Context ctx) {
    List<Bson> filters = new ArrayList<>(); // start with a blank document

    if (ctx.queryParamMap().containsKey(NAME_KEY)) {
        filters.add(eq(NAME_KEY, ctx.queryParam(NAME_KEY)));
    }

    // Combine the list of filters into a single filtering document.
    Bson combinedFilter = filters.isEmpty() ? new Document() : and(filters);

    return combinedFilter;
  }

  public void addNewProduct(Context ctx) {
    /*
     * The follow chain of statements uses the Javalin validator system
     * to verify that instance of `Product` provided in this context is
     * a "legal" product. It checks the following things (in order):
     *    - The product has a value for the name (`pdr.name != null`)
     *    - The product name is not blank (`pdr.name.length > 0`)
     *    - The store is assumed to not be blank ('pdr.store.length > 0')
     *    - The brand is assumed to not be blank ('pdr.brand.length > 0')
     */
    Product newProduct = ctx.bodyValidator(Product.class)
      .check(pdr -> pdr.name != null && pdr.name.length() > 0, "Product must have a non-empty product name")
      .check(pdr -> pdr.store != null && pdr.store.length() > 0, "Store must have a non-empty store name")
      .check(pdr -> pdr.brand != null && pdr.brand.length() > 0, "Product must have a non-empty brand name")
      .check(pdr -> pdr.lifespan >= 0, "Product's lifespan can't be negative")
      .check(pdr -> pdr.threshold >= 0, "Product's threshold can't be negative")
      .get();

    productCollection.insertOne(newProduct);

    // 201 is the HTTP code for when we successfully
    // create a new resource (a user in this case).
    // See, e.g., https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // for a description of the various response codes.
    ctx.status(HttpCode.CREATED);
    ctx.json(Map.of("id", newProduct._id));
  }
}
