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

  public filteredShoppingList: ShoppingList[];
  public serverFilteredShoppingList: ShoppingList[];

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
      productName: this.itemName
    }).subscribe(returnedShoppingList => {
      this.filteredShoppingList = returnedShoppingList;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }
  public updateFilter(): void {
    this.filteredShoppingList = this.shoppingListService.filterShoppingList(
      this.serverFilteredShoppingList, {name: this.itemName});
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
