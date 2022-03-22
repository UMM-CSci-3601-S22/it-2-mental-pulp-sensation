import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.scss']
})
export class ProductProfileComponent implements OnInit, OnDestroy {

  product: Product;
  id: string;
  getProductSub: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    // We subscribe to the parameter map here so we'll be notified whenever
    // that changes (i.e., when the URL changes) so this component will update
    // to display the newly requested product.
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getProductSub) {
        this.getProductSub.unsubscribe();
      }
      this.getProductSub = this.productService.getProductById(this.id).subscribe(product => this.product = product);
    });
  }

  ngOnDestroy(): void {
    if (this.getProductSub) {
      this.getProductSub.unsubscribe();
    }
  }

}
