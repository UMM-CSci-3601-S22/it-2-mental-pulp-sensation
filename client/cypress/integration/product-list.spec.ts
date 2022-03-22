import {ProductListPage } from '../support/product-list.po';

const page = new ProductListPage();

describe('Product List', () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should list products', () => {
    page.getProductListItems().should('exist');

  });

  it('Should type something in the name filter and have it return correct products', () => {
    // Filter for the product name "Apple"
    cy.get('[data-test=productNameInput]').type('Sobe - Orange Carrot');

    // All of the listed products should have the name we are filtering by
    page.getProductListItems().each(e => {
   cy.wrap(e).find('.product-list-name').should('have.text', 'Sobe - Orange Carrot');
    });

    // Secondary check to see if listed products have specified name
    page.getProductListItems().find('.product-list-name').each(el =>
      expect(el.text()).to.equal('Sobe - Orange Carrot')
    );
  });

  //This has not been implemented yet, still have to add {id} paths in Javalin

  it('Should click view profile on a product and go to the right URL', () => {
    page.getProductListItems().first().then((list) => {
      const firstProductName = list.find('.product-list-name').text();
      const firstProductBrand = list.find('.product-list-brand').text();

      // When the view profile button on the first product card is clicked, the URL should have a valid mongo ID
      page.clickFirstProduct();

      // The URL should be '/products/' followed by a mongo ID
      cy.url().should('match', /\/products\/[0-9a-fA-F]{24}$/);

      // On this profile page we were sent to, the name and brand should be correct
      cy.get('.product-card-name').first().should('have.text', firstProductName);
      cy.get('.product-card-brand').first().should('have.text', firstProductBrand);
    });
  });

  //This should get added when our add-product-component gets added

  it('Should click add product and go to the right URL', () => {
    // Click on the button for adding a new product
    page.addProductButton().click();

    // The URL should end with '/products/new'
    cy.url().should(url => expect(url.endsWith('/products/new')).to.be.true);

    // On the page we were sent to, We should see the right title
    cy.get('.add-product-title').should('have.text', 'New Product');
  });

});
