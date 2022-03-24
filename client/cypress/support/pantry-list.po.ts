export class PantryListPage {

    navigateTo() {
        return cy.visit('/pantry');
    }

    getPantryListItems() {
        return cy.get('.pantry-nav-list .pantry-list-item');
    }

    clickFirstPantry() {
        return cy.get('.pantry-nav-list .pantry-list-item').first().click();
    }
}