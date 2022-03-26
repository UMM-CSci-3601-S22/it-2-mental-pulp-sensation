import { shoppingListListPage } from '../support/shoppingList-list.po';

const page = new shoppingListListPage;

describe('shoppingList list', () => {

    before(() => {
      cy.task('seed:database');
    });
  
    beforeEach(() => {
      page.navigateTo();
    });

    it('Should type something in the name filter and check that it returned correct elements', () => {
        // Filter for user 'Lynn Ferguson'
        cy.get('[data-test=shoppingListNameInput]').type('Tomatoes');
    
        // All of the user cards should have the name we are filtering by
        page.getShoppingListItems().each(e => {
          cy.wrap(e).find('.product-list-name').should('have.text', 'Tomatoes');
        });
    
        // (We check this two ways to show multiple ways to check this)
        page.getShoppingListItems().find('.product-list-name').each(el =>
          expect(el.text()).to.equal('Tomatoes')
        );
      });
});