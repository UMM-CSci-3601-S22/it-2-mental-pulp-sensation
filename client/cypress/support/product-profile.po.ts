export class ProductProfilePage {

  navigateTo() {
    //This navigates to Bluberries - Frozen
    return cy.visit('/products/62250e35fc13ae51f90007d0');
  }

  getProductProfile() {
    return cy.get('app-product-card');
  }

  changeCategory(option: string) {
    cy.get('[data-test="openEditDropDown"]').click();
    return cy.get('[data-test=categoryDropDown]').click().get(`[data-test=click${option}]`).click();
  }

  changeStore(option: string) {
    cy.get('[data-test="openEditDropDown"]').click();
    return cy.get('[data-test=storeDropDown]').click().get(`[data-test=click${option}]`).click();
  }

  submitChanges(){
    return cy.get('[data-test="confirmChange"]').click();
  }

  grabCardInformation() {
    return cy.get(`app-product-card .product-card`);
  }
}
