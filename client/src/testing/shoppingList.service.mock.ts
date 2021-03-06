import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShoppingList } from '../app/shoppingList/shoppingList';
import { ShoppingListService } from '../app/shoppingList/shopping-list-list/shoppingList.service';

@Injectable()
export class MockShoppingListService extends ShoppingListService {
  static testShoppingList: ShoppingList[] = [
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

  constructor() {
    super(null);
  }

  getShoppingList(filters: {
    name?: string;
  }): Observable<ShoppingList[]> {
    return of(MockShoppingListService.testShoppingList);
  }
}
