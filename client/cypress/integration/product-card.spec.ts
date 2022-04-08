import { Product } from 'src/app/products/product';
import { Pantry } from 'src/app/pantry/pantry';
import { ProductCardPage } from 'cypress/support/product-card.po';

describe('Add pantry item', () => {
  const page = new ProductCardPage();
  before(() => {
    cy.task('seed:database');
  });

  it('should go to the Beef page, and add it', ()=> {
    page.navigateToProducts();
    page.navigateToProductCardBGM().click();
    cy.get('.product-card .product-card-name').should('have.text','Beef Ground Medium');
    page.addPantryButton().click();
    page.navigateToPantry();
    cy.url().should('match', /\/pantry$/);
    page.getPantryListBGM().click();
    cy.get('.pantry-card .pantry-card-name').should('have.text','Beef Ground Medium');
  });
});


