import { PantryListPage } from '../support/pantry-list.po';

const page = new PantryListPage();

describe('Pantry List', () => {

    before(() => {
        cy.task('seed:database');
    });

    beforeEach(() => {
        page.navigateTo();
    });

    it('Should list pantrys', () => {
        page.getPantryListItems().should('exist');

    });

    it('Should type something in the name filter and have it return correct pantrys', () => {
        // Filter for the pantry name "Apple"
        cy.get('[data-test=openFilter]').click().get('[data-test=pantryNameInput]').type('Apples');

        // All of the listed pantrys should have the name we are filtering by
        page.getPantryListItems().each(e => {
            cy.wrap(e).find('.pantry-list-name').should('have.text', 'Apples');
        });

        // Secondary check to see if listed pantrys have specified name
        page.getPantryListItems().find('.pantry-list-name').each(el =>
            expect(el.text()).to.equal('Apples')
        );
    });

    it('Should type something in the name filter and have it return correct pantrys', () => {
        // Filter for the pantry name "Apple"
        cy.get('[data-test=openFilter]').click().get('[data-test=pantryDateInput]').type('7/27/2021');

        // All of the listed pantrys should have the name we are filtering by
        page.getPantryListItems().each(e => {
            cy.wrap(e).find('.pantry-list-name').should('have.text', 'Lettuce');
        });

        // Secondary check to see if listed pantrys have specified name
        page.getPantryListItems().find('.pantry-list-name').each(el =>
            expect(el.text()).to.equal('Lettuce')
        );
    });

    it('Should click view profile on a pantry and go to the right URL', () => {
        page.getPantryListItems().first().then((list) => {
            const firstPantryName = list.find('.pantry-list-name').text();
            const firstPantryDate = list.find('.pantry-list-date').text();

            // When the view profile button on the first pantry card is clicked, the URL should have a valid mongo ID
            page.clickFirstPantry();

            // The URL should be '/pantrys/' followed by a mongo ID
            cy.url().should('match', /\/pantry\/[0-9a-fA-F]{24}$/);

            // On this profile page we were sent to, the name and brand should be correct
            cy.get('.pantry-card-name').first().should('have.text', firstPantryName);
            cy.get('.pantry-card-date').first().should('have.text', firstPantryDate);
        });
    });

});

