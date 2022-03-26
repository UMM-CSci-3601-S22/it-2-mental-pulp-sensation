import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShoppingList } from '../shoppingList';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  readonly shoppingListUrl: string = environment.apiUrl + 'shoppingList';

  constructor(private httpClient: HttpClient ) {
  }

  filterShoppingList()

  getShoppingListById(id: string): Observable<ShoppingList> {
    return this.httpClient.get<ShoppingList>(this.shoppingListUrl + '/' + id);
  }

  getShoppingList(filters?: { productName?: string }): Observable<ShoppingList[]> {
    let httpParams: HttpParams = new HttpParams();

    if (filters) {
      if (filters.name) {
        httpParams = httpParams.set('productName', filters.name);
      }
    }

    return this.httpClient.get<ShoppingList[]>(this.shoppingListUrl, {
      params: httpParams,
    });
  }

  addShoppingList(newShoppingList: ShoppingList): Observable<string> {
    return this.httpClient.post<{id: string}>(this.shoppingListUrl, newShoppingList).pipe(map(res => res.id));
  }
}
