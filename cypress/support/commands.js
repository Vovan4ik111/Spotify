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

//import '@testing-library/cypress/add-commands'; 

////CreateUser or login User scripts
Cypress.Commands.add('goToCreateAccountAndVerify', () => {
    cy.step('Navigate to Login page and click Create account link');
    cy.visit('/account/login');
    cy.get('#customer_register_link').click();
    
    cy.step('Verify that the registration URL and modal are correct');
    cy.url().should('include', '/register');
    cy.get('.section-header__title').should('have.text', 'Create Account');
});

Cypress.Commands.add('typeUserInfoAndSubmit', ({firstName, lastName, email, password}) => {
    cy.step('Type User info');
    cy.get('#FirstName').type(firstName);
    cy.get('#LastName').type(lastName);
    cy.get('#Email').type(email, {force: true, delay: 100});
    cy.get('#CreatePassword').type(password);

    cy.step('Submit the form');
    cy.get('input[type="submit"]').click();
});

////////////////////////////// search page //////////////////////////////////////////////////////////////////////

//Find search input and type a search word
Cypress.Commands.add('typeInSearchInput', (keyWord, forceSearch) => {
    //call search input
    cy.get('.site-nav__icons a[href="/search"]').click();
    //Type search word == keyWord
    if (forceSearch === 'no') {
        cy.get('.site-header__search-input').should('be.visible').type(keyWord);
    } else {
        cy.get('.site-header__search-input').should('be.visible').type(keyWord + '{enter}');
    }
});

//Verify Search title and url
Cypress.Commands.add('verifySearchTitleURL', (encodedKeyWord) => {
            //Verify Title is Search
            cy.get('h1.section-header__title').invoke('text').invoke('trim').should('include', 'Search');

            //Verify URL contains the search word == keyWord
            cy.url().should('include', '/search');
            cy.url().should('include', `=${encodedKeyWord}`);
});

// Reusable function to check if the elements contain the keyword
Cypress.Commands.add('checkResultsContainsKeyWords', (selector, keyWord) => {
    const keyWords = keyWord.split(' '); // Split keyWord into individual words
    
    cy.get(selector).each(($el) => {
        cy.wrap($el)
            .invoke('text')
            .then((text) => {
                const lowerCaseText = text.toLowerCase();
                keyWords.forEach(word => {
                    // Check if the text includes each word in a case-insensitive manner
                    expect(lowerCaseText).to.include(word.toLowerCase());
                });
            });
    });
});



//Verify the number of the results found
Cypress.Commands.add('checkResultsNumber', (selectorForNumbers, comparisonOperator) => {
     return cy.get(selectorForNumbers).contains('results').invoke('text').then((text) => {
        // Extract the number from the text
        const results = parseInt(text.match(/\d+/)[0], 10);
        // Perform the assertion based on the comparison operator
        if (comparisonOperator === 'greaterThan') {
            // Assert that the results are a positive number
            expect(results).to.be.greaterThan(0);
        } else if (comparisonOperator === 'eq') {
            // Assert that the results are equal 0
            expect(results).to.eq(0);
        }
        // Return the results number
        return results;
    })
});

// Custom command to check and compare results from breadcrumb and section header
Cypress.Commands.add('compareResultsBetweenBreadcrumbAndSectionHeader', (breadcrumbSelector, sectionHeaderSelector) => {
    cy.checkResultsNumber(breadcrumbSelector).then((breadcrumbResults) => {
        cy.checkResultsNumber(sectionHeaderSelector).then((sectionHeaderResults) => {
            expect(breadcrumbResults).to.equal(sectionHeaderResults);
        });
    });
});

///////////////////////// SORT ///////////////////////////////////////////////////////////////////////

Cypress.Commands.add('getProductPrices', (selector) => {
    return cy.get(selector).then($items => {
        // Create an array to store the price promises
        const pricePromises = $items.map((index, el) => {
            const priceElement = Cypress.$(el).find('.grid-product__price');
            let priceText = priceElement.text();
            
            // Use a promise to ensure async handling of the price extraction
            return new Cypress.Promise((resolve) => {
                cy.step('Check if there is a sale price');
                const salePriceElement = priceElement.find('.grid-product__price--original');
                if (salePriceElement.length > 0) {
                    priceText = salePriceElement.next().text();
                }
                
                // Resolve the promise with the parsed price
                resolve(parseFloat(priceText.replace(/[^0-9.-]+/g, "")));
            });
        }).get();

        // Return a Cypress promise that resolves with all the price values
        return Cypress.Promise.all(pricePromises);
    });
});     
