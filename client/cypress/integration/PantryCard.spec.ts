import { PantryCardPage } from '../support/pantry-card.po';

const page = new PantryCardPage();

describe('Pantry List', () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should delete a pantry item', () => {
    page.getPantryItems().first().click();
    cy.get('[data-test="removePantryButton"]').click();
    cy.url().should('match', /\/pantry/);
    cy.wait(3000);
    page.getPantryItems().get('.pantry-list-name').first().should('have.text', 'Ketchup');
  });
});
