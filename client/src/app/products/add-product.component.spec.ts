import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProductService } from 'src/testing/product.service.mock';
import { AddProductComponent } from './add-product.component';
import { ProductService } from './product.service';

describe('AddProductComponent', () => {
  let addProductComponent: AddProductComponent;
  let addProductForm: FormGroup;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [AddProductComponent],
      providers: [{ provide: ProductService, useValue: new MockProductService() }]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    addProductComponent = fixture.componentInstance;
    addProductComponent.ngOnInit();
    fixture.detectChanges();
    addProductForm = addProductComponent.addProductForm;
    expect(addProductForm).toBeDefined();
    expect(addProductForm.controls).toBeDefined();
  });

  it('should create the component and form', () => {
    expect(addProductComponent).toBeTruthy();
    expect(addProductForm).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(addProductForm.valid).toBeFalsy();
  });

  describe('The name field', () => {
    let nameControl: AbstractControl;

    beforeEach(() => {
      nameControl = addProductComponent.addProductForm.controls.name;
    });

    it('should not allow empty names', () => {
      nameControl.setValue('');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.hasError('required')).toBeTruthy();
    });

    it('should be fine with Conner\'s Potatoes', () => {
      nameControl.setValue('Conner\'s Potatoes');
      expect(nameControl.valid).toBeTruthy();
    });

    it('should be fine with a single character name', () => {
      nameControl.setValue('a');
      expect(nameControl.valid).toBeTruthy();
    });

    it('should fail on really long names', () => {
      nameControl.setValue('x'.repeat(51));
      expect(nameControl.valid).toBeFalsy();

      expect(nameControl.hasError('maxlength')).toBeTruthy();
    });

    it('should allow digits in the name', () => {
      nameControl.setValue('Bad2Th3B0ne');
      expect(nameControl.valid).toBeTruthy();
    });

    it('should fail if we provide an "existing" name', () => {
      // We're assuming that "abc123" and "123abc" already
      // exist so we disallow them.
      nameControl.setValue('abc123');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.hasError('existingName')).toBeTruthy();

      nameControl.setValue('123abc');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.hasError('existingName')).toBeTruthy();
    });
  });


  describe('The brand field', () => {
    let brandControl: AbstractControl;

    beforeEach(() => {
      brandControl = addProductComponent.addProductForm.controls.brand;
    });

    it('should not allow empty brands', () => {
      brandControl.setValue('');
      expect(brandControl.valid).toBeFalsy();
      expect(brandControl.hasError('required')).toBeTruthy();
    });

    it('should be fine with Conner\'s Potatoes', () => {
      brandControl.setValue('Conner\'s Potatoes');
      expect(brandControl.valid).toBeTruthy();
    });

    it('should be fine with a single character brand', () => {
      brandControl.setValue('a');
      expect(brandControl.valid).toBeTruthy();
    });

    it('should fail on really long brand', () => {
      brandControl.setValue('x'.repeat(51));
      expect(brandControl.valid).toBeFalsy();

      expect(brandControl.hasError('maxlength')).toBeTruthy();
    });

    it('should allow digits in the brand', () => {
      brandControl.setValue('Bad2Th3B0ne');
      expect(brandControl.valid).toBeTruthy();
    });
  });

  describe('The store field', () => {
    let storeControl: AbstractControl;

    beforeEach(() => {
      storeControl = addProductComponent.addProductForm.controls.store;
    });

    it('should not allow empty store', () => {
      storeControl.setValue('');
      expect(storeControl.valid).toBeFalsy();
      expect(storeControl.hasError('required')).toBeTruthy();
    });

    it('should be fine with Conner\'s Farmer\'s Market', () => {
      storeControl.setValue('Conner\'s Potatoes');
      expect(storeControl.valid).toBeTruthy();
    });

    it('should be fine with a single character store', () => {
      storeControl.setValue('a');
      expect(storeControl.valid).toBeTruthy();
    });

    it('should fail on really long store', () => {
      storeControl.setValue('x'.repeat(51));
      expect(storeControl.valid).toBeFalsy();

      expect(storeControl.hasError('maxlength')).toBeTruthy();
    });

    it('should allow digits in the store', () => {
      storeControl.setValue('Bad2Th3B0ne');
      expect(storeControl.valid).toBeTruthy();
    });
  });

  describe('The lifespan and threshold fields', () => {
    let lifespanControl: AbstractControl;
    let thresholdControl: AbstractControl;

    beforeEach(() => {
      lifespanControl = addProductComponent.addProductForm.controls.lifespan;
      thresholdControl = addProductComponent.addProductForm.controls.threshold;
    });

    it('should not allow negative lifespan', () => {
      lifespanControl.setValue(-1);
      expect(lifespanControl.valid).toBeFalsy();

      expect(lifespanControl.hasError('min')).toBeTruthy();
    });

    it('should not allow 0 lifespan', () => {
      lifespanControl.setValue(0);
      expect(lifespanControl.valid).toBeFalsy();

      expect(lifespanControl.hasError('min')).toBeTruthy();
    });

    it('should not allow negative threshold', () => {
      thresholdControl.setValue(-1);
      expect(thresholdControl.valid).toBeFalsy();

      expect(thresholdControl.hasError('min')).toBeTruthy();
    });

    it('should allow 0 threshold', () => {
      thresholdControl.setValue(0);
      expect(thresholdControl.valid).toBeTruthy();

      expect(thresholdControl.hasError('min')).toBeFalsy();
    });
  });
});
