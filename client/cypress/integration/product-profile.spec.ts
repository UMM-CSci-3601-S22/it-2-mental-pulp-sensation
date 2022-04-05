import { ProductProfilePage  } from 'cypress/support/product-profile.po';

const page = new ProductProfilePage();

describe('Product profile' , () => {

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
    // Filter for the product with threshold of 3
    cy.get('[data-test="thresholdInput"]').type('3');
    // This makes sure the list of searched for items has loaded before
    // we iterate through them in the next step. Hopefully this will
    // resolve the detached DOM problem.
    page.getProductProfile().should('have.length.at.least', 0);
    // cy.wait(3000);
    cy.get('[data-test="confirmChangeThreshold"]').click();
    // This makes sure the list of searched for items has loaded before
    // we iterate through them in the next step. Hopefully this will
    // resolve the detached DOM problem.
    page.getProductProfile().should('have.length.at.least', 0);

    // All of the listed products should have the name we are filtering by
    page.getProductProfile().each(e => {
      cy.wrap(e).find('[data-test="thresholdTest"]').should('have.text', 'Threshold: 3');
    });
  });
});
