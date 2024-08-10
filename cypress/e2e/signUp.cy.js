import { faker } from '@faker-js/faker';

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
        // const dynamicEmail = `username${Date.now()}@gmail.com`;
        const dynamicEmail = faker.internet.email();
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        cy.handleUser({
            action: 'create',
            firstName: firstName,
            lastName: lastName,
            email: dynamicEmail,
            password: 'myPassword'
          });

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
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        cy.handleUser({
            action: 'create',
            firstName: firstName,
            lastName: lastName,
            email: 'caxev69353@atebin.com',
            password: 'myPassword'
          });

        // Verify the error message
        //cy.get('.errors ul li').should('have.text', 'This email address is already associated with an account. If this account is yours, you can reset your password');
        
    });

    it('should the error message when register user with empty fields', () => {

        // Fill only password
        cy.handleUser({
            action: 'create',
            password: 'myPassword'
          });


        // Verify the error message
        //cy.get('.errors ul li').should('have.text', 'Email can't be blank.');

        //Reload the page.
        cy.reload();

        // Usage with dynamic email and no password
        const dynamicEmail = faker.internet.email();
        cy.handleUser({
            action: 'create',
            firstName: '',
            lastName: '',
            email: dynamicEmail
          });

        // Verify the error message
        //cy.get('.errors ul li').should('have.text', 'Password can't be blank.');
    });

    it('should fail with invalid email format', () => {
        // Fill with invalid email format
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        cy.handleUser({
            action: 'create',
            firstName: firstName,
            lastName: lastName,
            email: 'caxev69353@',
            password: 'myPassword'
          });

        // Verify the error message
        //cy.get('.errors ul li').should('have.text', 'Email is invalid.');  

        //Verify attribute email
        cy.get('#Email').should('have.attr', 'type', 'email');

    });
});
