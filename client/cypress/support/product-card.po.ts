export class ProductCardPage
{
  navigateToProductCardBGM() {
    return cy.get('.product-nav-list .product-list-name').contains('Beef Ground Medium');
  }
  navigateToProducts(){
    return cy.visit('/products');
  }
  addPantryButton() {
    return cy.get('[data-test="AddPantryButton"]');
  }
  navigateToPantry(){
    return cy.visit('/pantry');
  }
  getPantryListBGM() {
    return cy.get('.pantry-nav-list .pantry-list-item').contains('Beef Ground Medium');
}
}
