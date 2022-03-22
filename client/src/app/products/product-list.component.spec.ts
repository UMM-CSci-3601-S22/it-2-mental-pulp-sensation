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
import { MockProductService } from '../../testing/product.service.mock';
import { Product } from './product';
import { ProductCardComponent } from './product-card.component';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';
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

describe('List of Products in Pantry', () => {
  let productList: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [ ProductListComponent, ProductCardComponent ],
      providers: [{ provide: ProductService, useValue: new MockProductService() }]
    })
    .compileComponents();
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductListComponent);
      productList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(productList).toBeTruthy();
  });

  it('contains all products', () => {
    expect(productList.serverFilteredProducts.length).toBe(3);
  });

  it('contains a product with name \'Apple\'', () => {
    expect(productList.serverFilteredProducts.some((product: Product) => product.name === 'Apple')).toBe(true);
  });

  it('contains a product with name \'Grape\'', () => {
    expect(productList.serverFilteredProducts.some((product: Product) => product.name === 'Grape')).toBe(true);
  });

  it('contains a product with name \'Potato\'', () => {
    expect(productList.serverFilteredProducts.some((product: Product) => product.name === 'Potato')).toBe(true);
  });

});
