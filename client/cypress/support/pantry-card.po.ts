export class PantryCardPage{
  getPantryItems() {
    return cy.get('.pantry-nav-list .pantry-list-item');
  }
  navigateTo() {
    return cy.visit('/pantry');
  }
}
