import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { ProductProfileComponent } from './products//product-profile.component';
import { ProductListComponent } from './products/product-list.component';
import { ProductCardComponent } from './products/product-card.component';
import { ProductService } from './products/product.service';
import { AddProductComponent } from './products/add-product.component';
import { ShoppingListListComponent } from './shoppingList/shopping-list-list/shopping-list-list.component';
import { ShoppingListService } from './shoppingList/shopping-list-list/shoppingList.service';
import { PantryCardComponent } from './pantry/pantry-card/pantry-card.component';
import { PantryListComponent } from './pantry/pantry-list/pantry-list.component';
import { PantryProfileComponent } from './pantry/pantry-profile/pantry-profile.component';
import { PantryService } from './pantry/pantry.service';

const MATERIAL_MODULES: any[] = [
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatSidenavModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatSelectModule,
  MatOptionModule,
  MatFormFieldModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    ProductProfileComponent,
    ProductListComponent,
    ProductCardComponent,
    AddProductComponent,
    ShoppingListListComponent,
    PantryCardComponent,
    PantryListComponent,
    PantryProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MATERIAL_MODULES,
    LayoutModule,
  ],
  providers: [

    ProductService,
    ShoppingListService,
    PantryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
