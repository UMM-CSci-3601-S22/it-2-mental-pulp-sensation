import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockShoppingListService } from '../../../testing/shoppingList.service.mock';
import { ShoppingList } from '../shoppingList';
import { ShoppingListListComponent } from './shopping-list-list.component';
import { ShoppingListService } from './shoppingList.service';
import { MatIconModule } from '@angular/material/icon';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('ShoppingListListComponent', () => {
  let shoppingListList: ShoppingListListComponent;
  let fixture: ComponentFixture<ShoppingListListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [ ShoppingListListComponent],
      providers: [{ provide: ShoppingListService, useValue: new MockShoppingListService() }]
    })
    .compileComponents();
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ShoppingListListComponent);
      shoppingListList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(shoppingListList).toBeTruthy();
  });
  it('should contain all items', () => {
    expect(shoppingListList.filteredShoppingList.length).toBe(3);
  });
  it('contains a product with name \'Apple\'', () => {
    expect(shoppingListList.filteredShoppingList.some((item: ShoppingList) => item.productName === 'Apple')).toBe(true);
  });
  it('contains a product with name \'Root Beer\'', () => {
    expect(shoppingListList.filteredShoppingList.some((item: ShoppingList) => item.productName === 'Root Beer')).toBe(true);
  });
  it('contains a product with name \'Orange\'', () => {
    expect(shoppingListList.filteredShoppingList.some((item: ShoppingList) => item.productName === 'Orange')).toBe(true);
  });
});
