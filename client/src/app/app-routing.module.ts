import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list.component';
import { ProductProfileComponent } from './products/product-profile.component';
import { AddProductComponent } from './products/add-product.component';
import { ShoppingListListComponent } from './shoppingList/shopping-list-list/shopping-list-list.component';

// Note that the 'users/new' route needs to come before 'users/:id'.
// If 'users/:id' came first, it would accidentally catch requests to
// 'users/new'; the router would just think that the string 'new' is a user ID.
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/new', component: AddProductComponent},
  {path: 'products/:id', component: ProductProfileComponent},
  {path: 'shoppingList', component: ShoppingListListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
