

export class ProductListPage {
  navigateTo() {
    return cy.visit('/products');
  }

getProductListItems() {
  return cy.get('.product-nav-list .product-list-item');
}

clickFirstProduct() {
  return cy.get('.product-nav-list .product-list-item').first().click();
}

addProductButton() {
  return cy.get('[data-test=addProductButton]');
}
}
