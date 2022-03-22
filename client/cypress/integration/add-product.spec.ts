import { Product } from 'src/app/products/product';
import { AddProductPage } from '../support/add-product.po';

describe('Add product', () => {
  const page = new AddProductPage();

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTitle().should('have.text', 'New Product');
  });

  it('Should enable and disable the add product button', () => {
    // ADD PRODUCT button should be disabled until all the necessary fields
    // are filled. Once the last (`#lifespanField`) is filled, then the button should
    // become enabled.
    page.addProductButton().should('be.disabled');
    page.getFormField('name').type('test');
    page.addProductButton().should('be.disabled');
    page.getFormField('store').type('A store');
    page.addProductButton().should('be.disabled');
    page.getFormField('brand').type('potatoBrand');
    page.addProductButton().should('be.enabled');
    // page.getFormField('lifespan').type('number');
    // page.addProductButton().should('be.disabled');
    // page.getFormField('threshold').type('number');
    // page.addProductButton().should('be.disabled');
    // all the required fields have valid input, then it should be enabled
  });

  it('Should show error messages for invalid inputs', () => {
    // Before doing anything there shouldn't be an error
    cy.get('[data-test=nameError]').should('not.exist');
    // Just clicking the name field without entering anything should cause an error message
    page.getFormField('name').click().blur();
    cy.get('[data-test=nameError]').should('exist').and('be.visible');
    // Some more tests for various invalid name inputs
    page.getFormField('name').type('J').blur();
    cy.get('[data-test=nameError]').should('not.exist');
    page.getFormField('name').clear().type('This is a very long name that goes beyond the 50 character limit').blur();
    cy.get('[data-test=nameError]').should('exist').and('be.visible');
    // Entering a valid name should remove the error.
    page.getFormField('name').clear().type('John Smith').blur();
    cy.get('[data-test=nameError]').should('not.exist');
  });

  it('Should show error messages for invalid inputs', () => {
    // Before doing anything there shouldn't be an error
    cy.get('[data-test=storeError]').should('not.exist');
    // Just clicking the description field without entering anything should cause an error message
    page.getFormField('store').click().blur();
    cy.get('[data-test=storeError]').should('exist').and('be.visible');
    // Some more tests for various invalid description inputs
    page.getFormField('store').type('J').blur();
    cy.get('[data-test=storeError]').should('not.exist');
    page.getFormField('store').clear().type('This is a very long store that goes beyond the 50 character limit').blur();
    cy.get('[data-test=storeError]').should('exist').and('be.visible');
    // Entering a valid store should remove the error.
    page.getFormField('store').clear().type('John Smith').blur();
    cy.get('[data-test=storeError]').should('not.exist');
  });

  it('Should show error messages for invalid inputs', () => {
    // Before doing anything there shouldn't be an error
    cy.get('[data-test=brandError]').should('not.exist');
    // Just clicking the brand field without entering anything should cause an error message
    page.getFormField('brand').click().blur();
    cy.get('[data-test=brandError]').should('exist').and('be.visible');
    // Some more tests for various invalid brand inputs
    page.getFormField('brand').type('J').blur();
    cy.get('[data-test=brandError]').should('not.exist');
    page.getFormField('brand').clear().type('This is a very long brand that goes beyond the 50 character limit').blur();
    cy.get('[data-test=brandError]').should('exist').and('be.visible');
    // Entering a valid brand should remove the error.
    page.getFormField('brand').clear().type('John Smith').blur();
    cy.get('[data-test=brandError]').should('not.exist');
  });


  describe('Adding a new product', () => {

    beforeEach(() => {
      cy.task('seed:database');
    });

    it('Should go to the right page, and have the right info', () => {
      const product: Product = {
        _id: null,
        name: 'Test Product',
        brand: 'umm',
        store: 'location',
        lifespan: 20,
        threshold: 20
      };

      page.addProduct(product);

      // New URL should end in the 24 hex character Mongo ID of the newly added product
      cy.url()
        .should('match', /\/products\/[0-9a-fA-F]{24}$/)
        .should('not.match', /\/products\/new$/);

      // The new product should have all the same attributes as we entered
      cy.get('.product-card-name').should('have.text', product.name);
      cy.get('.product-card-brand').should('have.text', product.brand);
      cy.get('.product-card-store').should('have.text', 'Store: ' + product.store);
      cy.get('.product-card-lifespan').should('have.text', 'Lifespan: ' + product.lifespan);
      cy.get('.product-card-threshold').should('have.text', 'Threshold: ' + product.threshold);

      // We should see the confirmation message at the bottom of the screen
      cy.get('.mat-simple-snackbar').should('contain', `Added Product ${product.name}`);
    });

  });
});
