import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public serverFilteredProducts: Product[];
  public filteredProducts: Product[];

  public productName: string;
  public productDescription: string;
  public productBrand: string;
  public productCategory: string;
  public productStore: string;
  public productLocation: string;
  public productNotes: string;
  public productTags: string[];

  getProductsSub: Subscription;

  constructor(private productService: ProductService) { }

  getProductsFromServer(): void {
    this.unsub();
    this.getProductsSub = this.productService.getProducts({
      name: this.productName
      // description: this.productDescription,
      // brand: this.productBrand,
      // category: this.productCategory,
      // store: this.productStore,
      // location: this.productLocation,
      // notes: this.productNotes,
      // tags: this.productTags
    }).subscribe(returnedProducts => {
      this.serverFilteredProducts = returnedProducts;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateFilter(): void {
    this.filteredProducts = this.productService.filterProducts(
      this.serverFilteredProducts, {name: this.productName});
  }

  ngOnInit(): void {
    this.getProductsFromServer();
  }

  unsub(): void {
    if (this.getProductsSub) {
      this.getProductsSub.unsubscribe();
    }
  }

}
