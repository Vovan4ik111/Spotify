import {faker} from '@faker-js/faker';
import signUpPage from '../pageObjects/signUpPage';

describe('SignUp', () => {

    beforeEach(() => {
        // cy.step('run these tests as if in a desktop');
        // cy.step('browser with a 720p monitor');
        //cy.viewport(1280, 720);

        cy.step('Request');
        cy.intercept('GET', '/cart').as("cart");

        cy.step('visit homepage');
        cy.visit('/');
    });

    it('should call login url from navbar', () => {
        cy.step('Open Login form');
        cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();

        cy.wait('@cart');
        cy.step('Verify login url from navbar');
        cy.url().should('include', '/account/login');
    });

    it('should call login url from side menu', () => {
        cy.step('Open hamburg menu');
        cy.get('.icon.icon-hamburger').click();
        
        cy.step('Open Login form');
        cy.get('.mobile-nav__link').contains('Log in').click();

        cy.wait('@cart');
        cy.step('Verify login url from navbar');
        cy.url().should('include', '/account/login');
    });
    
    it('should create a new account', () => {

        cy.step('Usage with dynamic email');
        // const dynamicEmail = `username${Date.now()}@gmail.com`;
        const dynamicEmail = faker.internet.email();
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        cy.goToCreateAccountAndVerify();
        cy.typeUserInfoAndSubmit({
            firstName: firstName,
            lastName: lastName,
            email: dynamicEmail,
            password: 'myPassword'
          });

        //reCaptcha issue
        // cy.step('Open account info');
        //cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();
    
        // cy.step('Verify URL for account');
        //cy.url().should('include', '/account');
        // cy.step('Verify user name');
        //cy.get('.h5').should('have.text', firstName + ' ' + lastName);
    });

    it('should show the error message when register existing user', () => {

        cy.step('Usage with an existed email');
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        cy.goToCreateAccountAndVerify();
        cy.typeUserInfoAndSubmit({
            firstName: firstName,
            lastName: lastName,
            email: 'caxev69353@atebin.com',
            password: 'myPassword'
          });

        // cy.step('Verify the error message');
        //cy.get('.errors ul li').should('have.text', 'This email address is already associated with an account. If this account is yours, you can reset your password');
        
    });

    it('should show the error message when registering a user with empty fields', () => {
        
        const signUp = new signUpPage();

        cy.goToCreateAccountAndVerify();

        //signUp.getUserLastNameField().type('dynamicEmail');
        signUp.getCreateButton().click();

        // cy.step('Assert the error messages');
        // cy.get('.errors ul li').should(($lis) => {
        //     expect($lis).to.have.length(2); // Check that there are exactly 2 error messages
        //     expect($lis.eq(0)).to.have.text("Password can't be blank.");
        //     expect($lis.eq(1)).to.have.text("Email can't be blank.");
        // });
    });

    it('should show the error message when registering a user only with an email', () => {
        
        const signUp = new signUpPage();
        const dynamicEmail = faker.internet.email();

        cy.goToCreateAccountAndVerify();

        signUp.getUserEmailField().type(dynamicEmail);
        signUp.getCreateButton().click();
        // cy.step('Verify the error message');
        //cy.get('.errors ul li').should('have.text', 'Password can't be blank.');
    });


    it('should show the error message when registering a user only with a password', () => {
        
        const signUp = new signUpPage();

        cy.goToCreateAccountAndVerify();

        signUp.getUserPasswordField().type('myPassword');
        signUp.getCreateButton().click();
        // cy.step('Verify the error message');
        // cy.get('.errors ul li').should('have.text', 'Email can't be blank.');
        
    });

    it('should fail with invalid email format', () => {
        const signUp = new signUpPage();

        cy.goToCreateAccountAndVerify();
        // cy.step('Fill with invalid email format');
        signUp.getUserEmailField().type('email@');
        signUp.getCreateButton().click();

        // cy.step('Verify the error message');
        // cy.get('.errors ul li').should('have.text', 'Email is invalid.');  

        // cy.step('Verify attribute email');
        cy.get('#Email').should('have.attr', 'type', 'email');

    });
});
