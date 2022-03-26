import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ShoppingList } from '../shoppingList';
import { ShoppingListService } from './shoppingList.service';

describe('Shopping List service',() =>{
  const testShoppingList: ShoppingList[] = [
    {
      _id: 'apple_id',
      productName:'Apple',
      store: 'willies',
      quantity: 3,
      prodID: '44444444',
    },
    {
      _id: 'orange_id',
      productName:'Orange',
      store: 'coop',
      quantity: 4,
      prodID: '444444445',
    },
    {
      _id: 'rootBeer_id',
      productName:'Root Beer',
      store: 'willies',
      quantity: 10,
      prodID: '444444446',
    },
  ];
  let shoppingListService: ShoppingListService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    shoppingListService = new ShoppingListService(httpClient);
  });
  afterEach(()=> {
    httpTestingController.verify();
  });

  it('getShoppingList() calls api/shoppingList', () =>{
    shoppingListService.getShoppingList().subscribe(
      items => expect(items).toBe(testShoppingList)
    );

    const req = httpTestingController.expectOne(shoppingListService.shoppingListUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testShoppingList);
  });
});

