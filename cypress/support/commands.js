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
    
            //Type user's name,last name. email, and password if they are not empty
            if (firstName !== '') {
                cy.get('#FirstName').type(firstName);
            }
            if (lastName !== '') {
                cy.get('#LastName').type(lastName);
            }
            if (email !== '') {
                cy.get('#Email').type(email, {force: true, delay: 100});
            }
            if (password !== '') {
                cy.get('#CreatePassword').type(password);
            }
    
            //click on Create button
            cy.get('input[type="submit"]').click();
});

Cypress.Commands.add('loginUser', function(firstName, lastName, email, password) {
            //Verify login URL
            cy.url().should('include', '/login');

            //Check if it's Login form
            cy.get('.section-header__title').should('have.text', 'Login');
    
            //Type user's name,last name. email, and password
            if (email !== '') {
                cy.get('#CustomerEmail').type(email, {force: true, delay: 100});
            }
            if (password !== '') {
            cy.get('#CustomerPassword').type(password);
            }
    
            //Sign In
            cy.get('button.btn.btn--full').contains('Sign In').click();           
});
