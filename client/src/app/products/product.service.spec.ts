import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from './product';
import { ProductService } from './product.service';

describe('Product service:', () => {
  const testProducts: Product[] = [
    {
      _id: 'apple_id',
      name:'Apple',
      brand: 'UMM',
      description: 'apples from UMM',
      category: 'fruit',
      notes: 'Apples are cool'
    },
    {
      _id: 'grape_id',
      name:'Grape',
      brand: 'UMM',
      category: 'fruit',
      notes: 'Grapes are cooler than apple'
    },
    {
      _id: 'potato_id',
      name:'Potato',
      brand: 'Conner\'s Potatoes',
      description: 'Potatoes from Conner\'s potato farm',
      notes: 'These happen to be 12 of Conner\'s potatoes'
    }
  ];
  let productService: ProductService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    productService = new ProductService(httpClient);
  });


  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


it('getProducts() calls api/products', () => {
  productService.getProducts().subscribe(
    products => expect(products).toBe(testProducts)
  );

  const req = httpTestingController.expectOne(productService.productUrl);

  expect(req.request.method).toEqual('GET');

  req.flush(testProducts);
});

it('getProducts() calls api/products with filter param \'name\'', () => {
  productService.getProducts({name: 'Apple'}).subscribe(
    products => expect(products).toBe(testProducts)
  );

  const req = httpTestingController.expectOne(
  (request) => request.url.startsWith(productService.productUrl) && request.params.has('name'));

  expect(req.request.method).toEqual('GET');

  expect(req.request.params.get('name')).toEqual('Apple');

  req.flush(testProducts);
});


it('filterProducts() filters by name', () => {
  expect(testProducts.length).toBe(3);
  const productName = 'a';
  expect(productService.filterProducts(testProducts, {name: productName }).length).toBe(3);
});

});
