import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MockPantryService } from 'src/testing/pantry.service.mock';
import { PantryService } from '../pantry/pantry.service';

import { ProductCardComponent } from './product-card.component';
import { ProductService } from './product.service';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      providers: [{ provide: PantryService, useValue: new MockPantryService() },
      {provide: MatSnackBar, useValue: MatSnackBar },
      { provide: ActivatedRoute, useValue: activatedRoute },
    {provide: Router, useValue: Router}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
