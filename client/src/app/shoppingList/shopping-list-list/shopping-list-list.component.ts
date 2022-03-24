import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingList } from '../shoppingList';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list-list',
  templateUrl: './shopping-list-list.component.html',
  styleUrls: ['./shopping-list-list.component.scss']
})

export class ShoppingListListComponent implements OnInit {

  public FilteredShoppingList: ShoppingList[];

  // instead of typing shopping list i'm going to replace it with item
  public itemName: string;
  public itemStore: string;
  public itemProdID: string;
  public itemQuantity: number;

  getItemsSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  getItemsFromServer(): void {
    this.unsub();
    this.getItemsSub = this.shoppingListService.getShoppingList({
      name: this.itemName
    }).subscribe(returnedShoppingList => {
      this.FilteredShoppingList = returnedShoppingList;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.getItemsFromServer();
  }
  unsub(): void {
    if (this.getItemsSub) {
      this.getItemsSub.unsubscribe();
    }
  }
}
