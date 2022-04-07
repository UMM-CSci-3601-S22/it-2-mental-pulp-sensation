import { AppPage } from 'cypress/support/app.po';
import { ProductProfilePage } from 'cypress/support/product-profile.po';

const page = new ProductProfilePage();

describe('Product profile', () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  // We have hard coded the navigate to this exact ID, so we expect it to be this Orange Carrot to start
  it('Should list product', () => {
    page.getProductProfile().get('.product-card-name').should('have.text', 'Sobe - Orange Carrot');
  });
});

describe('Editing the Product', () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should type something in the name edit field and have it return correct changes', () => {
    // Check the it has the name we are expecting
    cy.get('.product-card-name').should('have.text', 'Sobe - Orange Carrot');
    cy.get('[data-test="openEditDropDown"]').click().get('[data-test="nameInput"]').clear();
    cy.get('[data-test="nameInput"]').click().type('Salmonella');
    cy.get('[data-test="confirmChange"]').click();
    cy.wait(1000);
    // Check that it changed to the correct new name
    cy.get('.product-card-name').should('have.text', 'Salmonella');
  });

  it('Should type something in the brand edit field and have it return correct changes', () => {
    // Check the it has the brand we are expecting
    cy.get('.product-card-brand').should('have.text', 'Ebert-Osinski');
    cy.get('[data-test="openEditDropDown"]').click().get('[data-test="brandInput"]').clear().type('Raw Meat');
    cy.get('[data-test="confirmChange"]').click();
    // Check that it changed to the correct new brand
    cy.get('.product-card-brand').should('have.text', 'Raw Meat');
  });

  it('Should be able to use the category drop down to change the category', () => {
    // Check the it has the category we are expecting
    cy.get('.product-card-category').should('contain', 'produce');
    page.changeCategory('Goods');
    page.submitChanges();
    // Check that it changed to the correct new category
    cy.get('.product-card-category').should('contain', 'Baked Goods');
  });

  it('Should be able to use the store drop down to change the category', () => {
    // Check the it has the store we are expecting
    cy.get('.product-card-store').should('contain', 'responsive');
    page.changeStore('Willies');
    page.submitChanges();
    // Check that it changed to the correct new store
    cy.get('.product-card-store').should('contain', 'Willies');
  });

  it('Should type something in the location edit field and have it return correct changes', () => {
    // Check the it has the threshold we are expecting
    cy.get('.product-card-location').should('have.text', 'porttitor lacus');
    cy.get('[data-test="openEditDropDown"]').click().get('[data-test="locationInput"]').clear().type('Aisle 4');
    cy.get('[data-test="confirmChange"]').click();

    // Check that it changed to the correct new location
    cy.get('.product-card-location').should('have.text', 'Aisle 4');
  });

  it('Should type something in the lifespan edit field and have it return correct changes', () => {
    // Check the it has the threshold we are expecting
    cy.get('.product-card-lifespan').should('have.text', '0');
    cy.get('[data-test="openEditDropDown"]').click().get('[data-test="lifespanInput"]').clear().type('4');
    cy.get('[data-test="confirmChange"]').click();

    // Check that it changed to the correct new lifespan
    cy.get('.product-card-lifespan').should('have.text', '4');
  });

  it('Should type something in the threshold edit field and have it return correct changes', () => {
    // Check the it has the threshold we are expecting
    cy.get('.product-card-threshold').should('have.text', '29');
    cy.get('[data-test="openEditDropDown"]').click().get('[data-test="thresholdInput"]').clear().type('3');
    cy.get('[data-test="confirmChange"]').click();

    // Check that it changed to the correct new threshold
    cy.get('.product-card-threshold').should('have.text', '3');
  });

  it('Should type something in the description edit field and have it return correct changes', () => {
    // Check the it has the threshold we are expecting
    cy.get('.product-card-description').should('contain', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam');
    cy.get('[data-test="openEditDropDown"]').click().get('[data-test="descriptionInput"]').clear().type('Small description');
    cy.get('[data-test="confirmChange"]').click();

    // Check that it changed to the correct new description
    cy.get('.product-card-description').should('have.text', 'Small description');
  });

  it('Should type something in the notes edit field and have it return correct changes', () => {
    // Check the it has the threshold we are expecting
    cy.get('.product-card-notes').should('contain', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.');
    cy.get('[data-test="openEditDropDown"]').click().get('[data-test="notesInput"]').clear().type('Isn\'t good for the heart');
    cy.get('[data-test="confirmChange"]').click();

    // Check that it changed to the correct new notes
    cy.get('.product-card-notes').should('have.text', 'Isn\'t good for the heart');
  });

  it('Should have accumulated all of these changes', () => {
    cy.get('.product-card-name').should('have.text', 'Salmonella');
    cy.get('.product-card-brand').should('have.text', 'Raw Meat');
    cy.get('.product-card-category').should('contain', 'Baked Goods');
    cy.get('.product-card-store').should('contain', 'Willies');
    cy.get('.product-card-location').should('have.text', 'Aisle 4');
    cy.get('.product-card-lifespan').should('have.text', '4');
    cy.get('.product-card-threshold').should('have.text', '3');
    cy.get('.product-card-description').should('have.text', 'Small description');
    cy.get('.product-card-notes').should('have.text', 'Isn\'t good for the heart');
  });


});
