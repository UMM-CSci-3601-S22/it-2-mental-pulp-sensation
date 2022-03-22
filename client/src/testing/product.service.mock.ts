import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../app/products/product';
import { ProductService } from '../app/products/product.service';

@Injectable()
export class MockProductService extends ProductService {
  static testProducts: Product[] = [
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

  constructor() {
    super(null);
  }

  getProducts(filters: { name: string }): Observable<Product[]> {
    return of(MockProductService.testProducts);
  }

  getProductById(id: string): Observable<Product> {
    // If the specified ID is for the first test product,
    // return that product, otherwise return `null` so
    // we can test illegal product requests.
    if (id === MockProductService.testProducts[0]._id) {
      return of(MockProductService.testProducts[0]);
    } else {
      return of(null);
    }
  }
}
