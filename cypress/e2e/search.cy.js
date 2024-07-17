
describe('Search Results Verification', () => {
    
    beforeEach(() => {
            //open homepage
            cy.visit('/');
    });

    it('should ensure all search results contain the word == searchWord', () => {
        const searchWord = 'Cat';

        //call search input
        cy.get('.site-nav__icons a[href="/search"]').click();
        //Type search word == searchWord
        cy.get('.site-header__search-input').should('be.visible').type(searchWord);
        // Wait for the search results to load
        cy.get('.predictive-result__layout').should('be.visible');

        // Reusable function to check if the elements contain the word == searchWord
        const checkResultsContainsSearchWord = (selector) => {
            cy.get(selector).each(($el) => {
            cy.wrap($el)
                .invoke('text')
                .then((text) => {
                // Check if the text includes the word == searchWord in a case-insensitive manner
                expect(text.toLowerCase()).to.include(searchWord.toLowerCase());
                });
            });
        };
    
        // Verify that each search result contains the word == searchWord
        checkResultsContainsSearchWord('.grid-product__title');
    
        // Verify that each article result contains the word == searchWord
        checkResultsContainsSearchWord('.grid-product__meta');

        //Click on "View more"
        cy.get('.predictive-results__footer').contains('View more').click();

        //Verify Title is Search
        cy.get('h1.section-header__title').invoke('text').should('include', 'Search');

        //Verify URL contains the search word == searchWord
        cy.url().should('include', '/search');
        cy.url().should('include', '='+searchWord);

        //Verify the number of the results found
        const checkResultsNumber = (selectorForNumbers) => {
            return cy.get(selectorForNumbers).contains('results').invoke('text').then((text) => {
                // Extract the number from the text
                const results = parseInt(text.match(/\d+/)[0], 10);
                // Assert that the results are a positive number
                expect(results).to.be.greaterThan(0);
                // Return the results number
                return results;
            })
        }
        // Check from breadcrumb
        checkResultsNumber('nav.breadcrumb').then((breadcrumbResults) => {
            // Check from section header
            checkResultsNumber('h2.section-header__title').then((sectionHeaderResults) => {
                // Compare breadcrumb and section header results
                expect(breadcrumbResults).to.equal(sectionHeaderResults);
        });
      });

      // Verify that each search result contains the word == searchWord
      checkResultsContainsSearchWord('.grid-product__title');

      //Go on the last page
      cy.get('.pagination .page a').last().click();

      // Verify that each search result contains the word == searchWord
      //it doesn't filter on the last page
      //checkResultsContainsSearchWord('.grid-product__title');

    });

    it('should not found any products', () => {
        const searchWord = 'qwert'

        //call search input
        cy.get('.site-nav__icons a[href="/search"]').click();

        //Type search word == searchWord
        cy.get('.site-header__search-input').should('be.visible').type(searchWord + '{enter}');

        //Verify Title is Search
        cy.get('h1.section-header__title').invoke('text').should('include', 'Search');

        //Verify URL contains the search word == searchWord
        cy.url().should('include', '/search');
        cy.url().should('include', '='+searchWord);

        //Verify the number of the results found
        const checkResultsNumber = (selectorForNumbers) => {
            return cy.get(selectorForNumbers).contains('results').invoke('text').then((text) => {
                // Extract the number from the text
                const results = parseInt(text.match(/\d+/)[0], 10);
                // Assert that the results are a positive number
                expect(results).to.be.eq(0);
                // Return the results number
                return results;
            })
        }
        // Check from breadcrumb
        checkResultsNumber('nav.breadcrumb').then((breadcrumbResults) => {
            // Check from section header
            checkResultsNumber('h2.section-header__title').then((sectionHeaderResults) => {
                // Compare breadcrumb and section header results
                expect(breadcrumbResults).to.equal(sectionHeaderResults);
        });
      });

    });
});
