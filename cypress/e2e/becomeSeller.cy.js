

describe('Become a seller', () => {
    
    it('open the link where you can become a seller from the navbar', () => {
        //Open the homepage
        cy.visit('/');
        //Click on Sellers button
        cy.get('.header-item--icons').contains('Sellers').click();

        //Verify the link for becoming a seller
       // cy.url().should('eq', 'https://sp-seller.webkul.com/mvm-landing/');   --fake url
        //cy.url().should('match', '/https:\/\/sp-seller\.webkul\.com\/mvm-landing\//');
    });

    it('open the link where you can become a seller from the navbar', () => {
        //Open the homepage
        cy.visit('/');
        //Click on Sellers button
        cy.get('.btn').contains('become a seller').click();

        //Verify the link for becoming a seller
       // cy.url().should('eq', 'https://sp-seller.webkul.com/mvm-landing/');   --fake url
        //cy.url().should('match', '/https:\/\/sp-seller\.webkul\.com\/mvm-landing\//');
    });

});
