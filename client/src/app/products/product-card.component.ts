import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PantryService } from '../pantry/pantry.service';
import { Product } from './product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  @Input() simple ? = false;

  constructor(private pantryService: PantryService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  submitProduct(product: Product){
    this.pantryService.addPantry(product).subscribe(newID => {
      this.snackBar.open('Added Product ' + product.name+' to Pantry', null, {
        duration: 2000,
      });
      this.router.navigate([]);
    }, err => {
      this.snackBar.open('Failed to add the product', 'OK', {
        duration: 5000,
      });
    });
  }

}
