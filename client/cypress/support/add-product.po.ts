import {Product} from 'src/app/products/product';

export class AddProductPage {
  navigateTo() {
    return cy.visit('/products/new');
  }

  getTitle() {
    return cy.get('.add-product-title');
  }

  addProductButton() {
    return cy.get('[data-test=confirmAddProductButton]');
  }

  selectMatSelectValue(select: Cypress.Chainable, value: string) {
    return select.click().get(`mat-option[value="${value}"]`).click();
  }

  getFormField(fieldName: string) {
    return cy.get(`mat-form-field [formControlName=${fieldName}]`);
  }

  addProduct(newProduct: Product) {
    this.getFormField('name').type(newProduct.name);
    this.getFormField('brand').type(newProduct.brand);
    this.getFormField('store').type(newProduct.store);
    if (newProduct.description) {
      this.getFormField('description').type(newProduct.description);
    }
    if (newProduct.category) {
      this.getFormField('category').type(newProduct.category);
    }
    if (newProduct.location) {
      this.getFormField('location').type(newProduct.location);
    }
    if (newProduct.notes) {
      this.getFormField('notes').type(newProduct.notes);
    }
    if (newProduct.lifespan) {
      this.getFormField('lifespan').type(newProduct.lifespan.toString());
    }
    if (newProduct.threshold) {
      this.getFormField('threshold').type(newProduct.threshold.toString());
    }

    return this.addProductButton().click();
  }
}
