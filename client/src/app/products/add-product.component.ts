import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;

  product: Product;

  addProductValidationMessages = {
    name: [
      { type: 'required', message: 'Must provide a product name.' },
      { type: 'maxlength', message: 'Name cannot be more than 50 characters long' },
      {
        type: 'existingName', message: 'There is already a product with the same name' +
          ' in the pantry'
      }
    ],

    brand: [
      { type: 'required', message: 'Must provide a brand' },
      { type: 'maxlength', message: 'Brand cannot be more than 50 characters long' }
    ],

    store: [
      { type: 'required', message: 'Must provide a store.' },
      { type: 'maxlength', message: 'Store cannot be more than 50 characters long' }
    ],

    lifespan: [
      { type: 'min', message: 'Lifespan must be greater than 0' }
    ],

    threshold: [
      { type: 'min', message: 'Threshold cannot be negative' }
    ]
  };

  constructor(private fb: FormBuilder, private productService: ProductService, private snackBar: MatSnackBar, private router: Router) { }

  createForms() {

    // add product form validations
    this.addProductForm = this.fb.group({
      // We allow alphanumeric input and limit the length for name.
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(0),
        // In the real world you'd want to be very careful about having
        // an upper limit like this because people can sometimes have
        // very long names. This demonstrates that it's possible, though,
        // to have maximum length limits.
        Validators.maxLength(50),
        (fc) => {
          if (fc.value.toLowerCase() === 'abc123' || fc.value.toLowerCase() === '123abc') {
            return ({ existingName: true });
          } else {
            return null;
          }
        },
      ])),

      // Checks validation for brand
      brand: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(50)
      ])),

      store: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(50)
      ])),

      lifespan: new FormControl('', Validators.compose([
        Validators.min(1),
        Validators.pattern('^[0-9]+$')
      ])),

      threshold: new FormControl('', Validators.compose([
        Validators.min(0),
        Validators.pattern('^[0-9]+$')
      ])),

      description: new FormControl(),

      category: new FormControl(),

      location: new FormControl(),

      notes: new FormControl(),

    });

  }

  ngOnInit(): void {
    this.createForms();
  }

  submitForm() {
    this.productService.addProduct(this.addProductForm.value).subscribe(newID => {
      this.snackBar.open('Added Product ' + this.addProductForm.value.name, null, {
        duration: 2000,
      });
      this.router.navigate(['/products/', newID]);
    }, err => {
      this.snackBar.open('Failed to add the product', 'OK', {
        duration: 5000,
      });
    });
  }

}
