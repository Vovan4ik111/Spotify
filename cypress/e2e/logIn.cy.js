import { faker } from "@faker-js/faker";
import loginPage from "../pageObjects/loginPage";

describe('LogIn', () => {

    beforeEach(() => {
        // cy.step('run these tests as if in a desktop');
        // cy.step('browser with a 720p monitor');
        //cy.viewport(1280, 720);
        cy.step('Request');
        cy.intercept('GET', '/cart').as("cart");

        cy.step('visit login page');
        cy.visit('/account/login');
    });

    it('should trigger login url from navbar', () => {
      cy.step('Open Login form');
      cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();

      cy.wait('@cart');
      cy.step('Verify login url from navbar');
      cy.url().should('include', '/account/login');
  });

  it('should trigger login url from side menu', () => {
      cy.step('Open hamburg menu');
      cy.get('.icon.icon-hamburger').click();
      
      cy.step('Open Login form');
      cy.get('.mobile-nav__link').contains('Log in').click();

      cy.wait('@cart');
      cy.step('Verify login url from navbar');
      cy.url().should('include', '/account/login');
  });

    it('should log in the existed user', () => {

      const logIn = new loginPage();

      logIn.getUserEmailField().type('caxev69353@atebin.com');
      logIn.getUserPasswordField().type('myPassword');

      cy.step('Verify text on the "Sign In" button')
      logIn.getSignInButton().invoke('text').invoke('trim').should('include', 'Sign In');
      logIn.getSignInButton().click();

            //reCaptcha issue
            // cy.step('Open account info');
            //cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();
    
            // cy.step('Verify URL for account');
            //cy.url().should('include', '/account');
            // cy.step('Verify user name');
            //cy.get('.h5').should('have.text', firstName + ' ' + lastName);        
    });
    
    it('should show an error message for non-registered users during login', () => {
        cy.step('Usage with dynamic email');
        const userEmail = faker.internet.email();
        const logIn = new loginPage();

        logIn.getUserEmailField().type(userEmail);
        logIn.getUserPasswordField().type('myPassword');

        logIn.getSignInButton().click();

        //cy.step('Verify error message');
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');
    });

    it('should display an error message for empty fields', () => {

      const logIn = new loginPage();

      logIn.getSignInButton().click();

        // cy.step('Verify error message');
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');

    });

    it('should fail with incorrect password', () => {

      const logIn = new loginPage();

      logIn.getUserEmailField().type('caxev69353@atebin.com');
      logIn.getUserPasswordField().type('wrongPassword');

      logIn.getSignInButton().click();

        // cy.step('Verify error message');
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');

    });
    
});
