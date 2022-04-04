import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  changeProductForm: FormGroup;
  product: Product;
  id: string;
  getProductSub: Subscription;

  addProductValidationMessages = {
    threshold: [
      { type: 'min', message: 'Threshold cannot be negative' }
    ]
  };


  constructor(private route: ActivatedRoute, private productService: ProductService, private fb: FormBuilder, private snackBar: MatSnackBar,
     private router: Router) { }

     createForms() {
      this.changeProductForm = this.fb.group({
        _id: new FormControl(),
        name: new FormControl(),
        brand: new FormControl(),
        store: new FormControl(),
        lifespan: new FormControl(),
        description: new FormControl(),
        category: new FormControl(),
        location: new FormControl(),
        notes: new FormControl(),
        threshold: new FormControl('', Validators.compose([
          Validators.min(0),
          Validators.pattern('^[0-9]+$')
        ]))
      });
    }

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

    this.createForms();
  }

  ngOnDestroy(): void {
    if (this.getProductSub) {
      this.getProductSub.unsubscribe();
    }
  }

  submitForm() {
    this.changeProductForm.value._id = this.id;
    this.productService.changeProduct(this.changeProductForm.value).subscribe(newID => {
      this.snackBar.open('Changed Threshold to ' + this.changeProductForm.value.threshold, null, {
        duration: 2000,
      });
      this.reloadComponent();
    }, err => {
      this.snackBar.open('Failed to add the product', 'OK', {
        duration: 5000,
      });
    });
  }

  reloadComponent(){
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
