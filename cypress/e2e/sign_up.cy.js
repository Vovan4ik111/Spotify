
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

        //visit homepage
        cy.visit('/');
    });
    
    it('Create a new account', () => {
        //Open Login form
        cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();

        //click on Create account link
        cy.get('#customer_register_link').click();

        //Verify login URL
        cy.url().should('include', '/register');

        //Check if it's Sign In modal
        cy.get('.section-header__title').should('have.text', 'Create Account');

        const first_name = 'John';
        const last_name = 'Doe';
        const email = (('username' + Date.now()) + '@gmail.com'); 
        const password = 'myPassword';

        //Type user's name,last name. email, and password
        cy.get('#FirstName').type(first_name);
        cy.get('#LastName').type(last_name);
        cy.get('#Email').type(email, {force: true, delay: 100});
        cy.get('#CreatePassword').type(password);

        //click on Create button
        cy.get('input[type="submit"]').click();

        //reCaptcha issue
        //Open account info
        //cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();

        //Verify URL for account
        //cy.url().should('include', '/account');
        //Verify user name
        //cy.get('.h5').should('have.text', first_name + ' ' + last_name);
        //email caxev69353@atebin.com  MyPassword2024
    });
});
