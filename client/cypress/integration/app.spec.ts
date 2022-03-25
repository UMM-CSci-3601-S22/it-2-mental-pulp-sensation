import { AppPage } from '../support/app.po';

const page = new AppPage();

describe('App', () => {
  beforeEach(() => page.navigateTo());

  it('Should have the correct title', () => {
    page.getAppTitle().should('contain', 'Handy Pantry');
  });

  it('The sidenav should open, navigate to "Pantry" and back to "Home"', () => {
    // Before clicking on the button, the sidenav should be hidden
    page.getSidenav()
      .should('be.hidden');
    page.getSidenavButton()
      .should('be.visible');

      page.getSidenavButton().click();
    page.getNavLink('Product').click();
    cy.url().should('match', /\/products$/);
    page.getSidenav()
      .should('be.hidden');

    page.getSidenavButton().click();
    page.getNavLink('Home').click();
    cy.url().should('match', /^https?:\/\/[^\/]+\/?$/);
    page.getSidenav()
      .should('be.hidden');

      page.getSidenavButton().click();
    page.getNavLink('Pantry').click();
    cy.url().should('match', /\/pantry$/);
    page.getSidenav()
      .should('be.hidden');
  });

});
