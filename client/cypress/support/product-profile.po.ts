export class ProductProfilePage {

  navigateTo() {
    //This navigates to Bluberries - Frozen
    return cy.visit('/products/62250e35fc13ae51f90007d0');
  }

  getProductProfile() {
    return cy.get('app-product-card');
  }
}
