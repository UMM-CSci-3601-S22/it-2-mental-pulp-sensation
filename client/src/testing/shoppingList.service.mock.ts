import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShoppingList } from '../app/shoppingList/shoppingList';
import { ShoppingListService } from '../app/shoppingList/shopping-list-list/shoppingList.service';

@Injectable()
export class MockShoppingListService extends ShoppingListService {
  static testShoppingLists: ShoppingList[] = [
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

  getShoppingLists(filters: { name: string }): Observable<ShoppingList[]> {
    return of(MockShoppingListService.testShoppingLists);
  }

  getShoppingListById(id: string): Observable<ShoppingList> {
    // If the specified ID is for the first test shoppingList,
    // return that shoppingList, otherwise return `null` so
    // we can test illegal shoppingList requests.
    if (id === MockShoppingListService.testShoppingLists[0]._id) {
      return of(MockShoppingListService.testShoppingLists[0]);
    } else {
      return of(null);
    }
  }
}
