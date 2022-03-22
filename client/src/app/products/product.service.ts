import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from './product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly productUrl: string = environment.apiUrl + 'products';

  constructor(private httpClient: HttpClient ) {
  }

  filterProducts(products: Product[], filters: { name?: string }): Product[] {

    let filteredProducts = products;

    // Filter by name
    if (filters.name) {
      filters.name = filters.name.toLowerCase();

      filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().indexOf(filters.name) !== -1);
    }

    return filteredProducts;
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.productUrl + '/' + id);
  }

  getProducts(filters?: { name?: string }): Observable<Product[]> {
    let httpParams: HttpParams = new HttpParams();

    if (filters) {
      if (filters.name) {
        httpParams = httpParams.set('name', filters.name);
      }
    }

    return this.httpClient.get<Product[]>(this.productUrl, {
      params: httpParams,
    });
  }

  addProduct(newProduct: Product): Observable<string> {
    return this.httpClient.post<{id: string}>(this.productUrl, newProduct).pipe(map(res => res.id));
  }
}
