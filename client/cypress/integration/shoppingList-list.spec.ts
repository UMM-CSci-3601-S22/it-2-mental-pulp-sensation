import { ShoppingListListPage } from '../support/shoppingList-list.po';

const page = new ShoppingListListPage();

describe('shoppingList list', () => {

    before(() => {
      cy.task('seed:database');
    });

    beforeEach(() => {
      page.navigateTo();
    });


    it('Should type something in the name filter and check that it returned correct elements', () => {
        // Filter for tomatoes
        cy.get('[data-test=shoppingListNameInput]').type('Tomatoes');

    // This makes sure the list of searched for items has loaded before
    // we iterate through them in the next step. Hopefully this will
    // resolve the detached DOM problem.
    page.getShoppingListItems().should('have.length.at.least', 0);
    cy.wait(3000);

        // All of the user cards should have the name we are filtering by
        page.getShoppingListItems().each(e => {
          cy.wrap(e).find('.shoppingList-list-name').should('have.text', 'Tomatoes');
        });

        // (We check this two ways to show multiple ways to check this)
        page.getShoppingListItems().find('.shoppingList-list-name').each(el =>
          expect(el.text()).to.equal('Tomatoes')
        );
      });

      it('Should search by name for a shoppingList name that is not the first name and return correct element', () => {
        // Filter for honey
        cy.get('[data-test=shoppingListNameInput]').type('Honey');

    // This makes sure the list of searched for items has loaded before
    // we iterate through them in the next step. Hopefully this will
    // resolve the detached DOM problem.
    // page.getShoppingListItems().should('have.length.at.least', 0);
    // cy.wait(3000);

        // This makes sure the list of searched for items has loaded before
    // we iterate through them in the next step. Hopefully this will
    // resolve the detached DOM problem.
    page.getShoppingListItems().should('have.length.at.least', 0);

    // All of the user cards should have the name we are filtering by
        page.getShoppingListItems().each(e => {
          cy.wrap(e).find('.shoppingList-list-name').should('have.text', 'Honey');
        });

        // (We check this two ways to show multiple ways to check this)
        page.getShoppingListItems().find('.shoppingList-list-name').each(el =>
          expect(el.text()).to.equal('Honey')
        );
      });

});
