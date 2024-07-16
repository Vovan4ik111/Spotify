// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands'; 

Cypress.Commands.add('createUser', function(firstName, lastName, email, password) {
            //Go to Login URL
            cy.visit('/account/login');

            //click on Create account link
            cy.get('#customer_register_link').click();
    
            //Verify login URL
            cy.url().should('include', '/register');
    
            //Check if it's Sign In modal
            cy.get('.section-header__title').should('have.text', 'Create Account');
    
            // const first_name = 'John';
            // const last_name = 'Doe';
            // const email = (('username' + Date.now()) + '@gmail.com'); 
            // const password = 'myPassword';
    
            //Type user's name,last name. email, and password
            cy.get('#FirstName').type(firstName);
            cy.get('#LastName').type(lastName);
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
});
