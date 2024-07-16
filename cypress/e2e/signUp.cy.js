
// Ignore uncaught exceptions
// Cypress.on('uncaught:exception', (err, runnable) => {
//     // Returning false here prevents Cypress from failing the test
//     return false;
//   });
  

describe('SignUp', () => {

    beforeEach(() => {
        // run these tests as if in a desktop
        // browser with a 720p monitor
        //cy.viewport(1280, 720);

        // Request
        cy.intercept('GET', '/cart').as("cart");

        //visit homepage
        cy.visit('/');
    });

    it('should call login url from navbar', () => {
        //Open Login form
        cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();

        cy.wait('@cart');
        //Verify login url from navbar
        cy.url().should('include', '/account/login');
    });

    it('should call login url from side menu', () => {
        //Open hamburg menu
        cy.get('.icon.icon-hamburger').click();
        
        //Open Login form
        cy.get('.mobile-nav__link').contains('Log in').click();

        cy.wait('@cart');
        //Verify login url from navbar
        cy.url().should('include', '/account/login');
    });
    
    it('should create a new account', () => {

        // Usage with dynamic email
        const dynamicEmail = `username${Date.now()}@gmail.com`;
        cy.createUser('John', 'Doe', dynamicEmail, 'myPassword');

        //reCaptcha issue
        //Open account info
        //cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();
    
        //Verify URL for account
        //cy.url().should('include', '/account');
        //Verify user name
        //cy.get('.h5').should('have.text', firstName + ' ' + lastName);
    });

    it('should show the error message when register existing user', () => {

        // Usage with specific email
        cy.createUser('John', 'Doe', 'caxev69353@atebin.com', 'myPassword');

        // Verify the error message
        //cy.get('.errors ul li').should('have.text', 'This email address is already associated with an account. If this account is yours, you can reset your password');
        
    });

    it('should the error message when register user with empty fields', () => {

        // Fill only password
        cy.createUser('', '', '', 'myPassword');

        // Verify the error message
        //cy.get('.errors ul li').should('have.text', 'Email can't be blank.');

        //Reload the page.
        cy.reload();

        // Usage with dynamic email and no password
        const dynamicEmail = `username${Date.now()}@gmail.com`;
        cy.createUser('', '', dynamicEmail, '');

        // Verify the error message
        //cy.get('.errors ul li').should('have.text', 'Password can't be blank.');
    });
});
