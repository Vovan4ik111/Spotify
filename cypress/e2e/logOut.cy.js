
describe('LogOut a user', () => {
    
    beforeEach(() => {
        // Create a session for logging in
        cy.session('loginSession', () => {
            //visit homepage
            cy.visit('/account/login');

            cy.loginUser('John', 'Doe', 'caxev69353@atebin.com', 'MyPassword2024');
            //Verify URL for account
            //cy.url().should('include', '/account');
            //Verify user name
            //cy.get('.h5').should('have.text', firstName + ' ' + lastName);
        });
    });

    it('should log out a user', () => {
        
        //Click on the Log out button
        //cy.get('.btn--secondary').contains('Log out').click();

        //Verify the URL 
        //cy.url().should('include','/');

        //Verify that account is empty and need to log in again
        //Open Login form
        //cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();
        //Verify login url from navbar
        //cy.url().should('include', '/account/login');

    });
});
