import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockPantryService } from 'src/testing/pantry.service.mock';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { MockProductService } from '../../testing/product.service.mock';
import { PantryService } from '../pantry/pantry.service';
import { Product } from './product';
import { ProductCardComponent } from './product-card.component';
import { ProductProfileComponent } from './product-profile.component';
import { ProductService } from './product.service';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

describe('ProductProfileComponent', () => {
  let component: ProductProfileComponent;
  let changeProductForm: FormGroup;
  let fixture: ComponentFixture<ProductProfileComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();
  const expectedProduct: Product = MockProductService.testProducts[0];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule
      ],
      declarations: [ProductProfileComponent, ProductCardComponent],
      providers: [
        { provide: ProductService, useValue: new MockProductService() },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PantryService, useValue: new MockPantryService() },
        { provide: MatSnackBar, useValue: MatSnackBar }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    activatedRoute.setParamMap({ id: expectedProduct._id });

    fixture = TestBed.createComponent(ProductProfileComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();


    changeProductForm = component.changeProductForm;
    expect(changeProductForm).toBeDefined();
    expect(changeProductForm.controls).toBeDefined();
  });

  it('should create the component and form', () => {
    expect(component).toBeTruthy();
    expect(changeProductForm).toBeTruthy();
  });

  it('should navigate to a specific product profile', () => {
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `ProductProfileComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedProduct._id });

    expect(component.id).toEqual(expectedProduct._id);
    expect(component.product).toEqual(expectedProduct);
  });

  it('should navigate to correct product when the id parameter changes', () => {
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `ProductProfileComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedProduct._id });

    expect(component.id).toEqual(expectedProduct._id);

    // Changing the paramMap should update the displayed product profile.
    activatedRoute.setParamMap({ id: expectedProduct._id });

    expect(component.id).toEqual(expectedProduct._id);
  });

  it('`null` for the product for a bad ID', () => {
    activatedRoute.setParamMap({ id: 'badID' });

    // If the given ID doesn't map to a product, we expect the service
    // to return `null`, so we would expect the component's product
    // to also be `null`.
    expect(component.id).toEqual('badID');
    expect(component.product).toBeNull();
  });

  it('should reload the page and keep correct values', () => {
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `ProductProfileComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedProduct._id });
    expect(component.id).toEqual(expectedProduct._id);
    component.reloadComponent();
    expect(component.id).toEqual(expectedProduct._id);
  });
});
