import { Component, OnInit, Input } from '@angular/core';
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

  constructor(public pantryService: PantryService) { }

  ngOnInit(): void {
  }

}
