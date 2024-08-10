import { faker } from "@faker-js/faker";

describe('LogIn', () => {

    beforeEach(() => {
        // run these tests as if in a desktop
        // browser with a 720p monitor
        //cy.viewport(1280, 720);

        //visit homepage
        cy.visit('/account/login');
    });

    it('should log in the existed user', () => {

        cy.handleUser({
            action: 'login',
            firstName: 'John',
            lastName: 'Doe',
            email: 'caxev69353@atebin.com',
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
    
    it('should show an error message for non-registered users during login', () => {
        // Usage with dynamic email
        const dynamicEmail = faker.internet.email();
        cy.handleUser({
            action: 'login',
            firstName: '',
            lastName: '',
            email: dynamicEmail,
            password: 'myPassword'
          });

        //Verify error message
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');
    });

    it('should display an error message for empty fields', () => {

        cy.handleUser({
            action: 'login',
            firstName: '',
            lastName: '',
            email: '',
            password: 'MyPassword2024'
          });

        //Verify error message
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');

        cy.reload();

        cy.handleUser({
            action: 'login',
            firstName: '',
            lastName: '',
            email: 'caxev69353@atebin.com',
            password: ''
          });



        //Verify error message
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');

    });

    it('should fail with incorrect password', () => {

        cy.handleUser({
            action: 'login',
            firstName: '',
            lastName: '',
            email: 'caxev69353@atebin.com',
            password: 'MyPassword'
          });

        //Verify error message
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');

    });

    
});
