export class ShoppingListListPage {
    navigateTo() {
        return cy.visit('/shoppingList');
      }

      getShoppingListItems() {
          return cy.get('.shoppingList-list .shoppingList-list-item');
      }
}
