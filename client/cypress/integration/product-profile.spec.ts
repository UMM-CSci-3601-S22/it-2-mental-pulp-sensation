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
});
