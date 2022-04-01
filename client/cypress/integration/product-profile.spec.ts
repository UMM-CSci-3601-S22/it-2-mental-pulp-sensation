import { ProductProfilePage  } from 'cypress/support/product-profile.po';

const page = new ProductProfilePage();

describe('Product List' , () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should list product', () => {
    page.getProductProfile().get('.product-card-name').should('have.text', 'Sobe - Orange Carrot');
  });

  it('Should type something in the name filter and have it return correct products', () => {
    // Filter for the product name "Apple"
    cy.get('[data-test="thresholdInput"]').type('3');
    cy.get('[data-test="confirmChangeThreshold"]').click();

    // All of the listed products should have the name we are filtering by
    page.getProductProfile().each(e => {
   cy.wrap(e).find('[data-test="thresholdTest"]').should('have.text', 'Threshold: 3');
    });
  });
});
