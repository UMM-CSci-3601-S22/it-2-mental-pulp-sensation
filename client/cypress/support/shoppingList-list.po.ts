export class shoppingListListPage {
    navigateTo() {
        return cy.visit('/shoppingList');
      }

      getShoppingListItems() {
          return cy.get('.shoppingList-nav-list .product-list-item');
      }
}