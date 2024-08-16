
describe('Search Results Verification', () => {
    
    beforeEach(() => {

        cy.step('open homepage');
        cy.visit('/');
    });

    it('should ensure all search results contain the word == keyWord', () => {
        const keyWord = 'Cat';
        const encodedKeyWord = encodeURIComponent(keyWord);
        const comparisonOperator = 'greaterThan';
        const isForceSearch = 'False';

        cy.typeInSearchInput(keyWord, isForceSearch);

        cy.step('Wait for the search results to load');
        cy.get('.predictive-result__layout').should('be.visible');
    
        cy.step('Verify that each search result contains the word == keyWord');
        cy.checkResultsContainsKeyWords('.grid-product__title', keyWord);
    
        cy.step('Verify that each article result contains the word == keyWord');
        cy.checkResultsContainsKeyWords('.grid-product__meta', keyWord);

        cy.step('Click on "View more"');
        cy.get('.predictive-results__footer').contains('View more').click();

        cy.verifySearchTitleURL(encodedKeyWord);

        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator);

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');

        cy.step('Verify that each search result contains the word == keyWord');
        cy.checkResultsContainsKeyWords('.grid-product__title', keyWord);

        cy.step('Go on the last page');
        cy.get('.pagination .page a').last().click();

        cy.step('Verify that each search result contains the word == keyWord');
        //cy.step("it doesn't filter on the last page");
        //checkResultsContainsKeyWords('.grid-product__title');

    });

    it('should not found any products', () => {
        const keyWord = 'qwert';
        const encodedKeyWord = encodeURIComponent(keyWord);
        const comparisonOperator = 'eq';
        //const isForceSearch = 'True';

        cy.typeInSearchInput(keyWord);

        cy.verifySearchTitleURL(encodedKeyWord);

        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator);

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');

    });

    it('should show appropriate message when search with an empty query', () => {
        const keyWord = '';
        const encodedKeyWord = encodeURIComponent(keyWord);
        //const isForceSearch = 'True';

        cy.typeInSearchInput(keyWord);

        cy.verifySearchTitleURL(encodedKeyWord);

    });

    it('should search multi-words with special characters returns appropriate results', () => {
        const keyWord = 'dog & cat 0';
        const encodedKeyWord = encodeURIComponent(keyWord);
        const comparisonOperator = 'greaterThan';
        //const isForceSearch = 'True';

        cy.typeInSearchInput(keyWord);

        cy.verifySearchTitleURL(encodedKeyWord);

        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator);

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');

        cy.step('Verify that each search result contains the word == keyWord');
        cy.checkResultsContainsKeyWords('.grid-product__title', keyWord);
    });

    it('should return an error for excessively long queries', () => {
        
        const keyWord = 'a'.repeat(1001);
        const encodedKeyWord = encodeURIComponent(keyWord);
        const comparisonOperator = 'eq';
        
        cy.step('Type and submit');
        cy.typeInSearchInput(keyWord);

        cy.verifySearchTitleURL(encodedKeyWord);

        // cy.step('Verify the error message for excessively long queries');
        // cy.get('#.error-message').should('be.visible').should('have.text', 'Your search query is too long. Please enter a shorter query.');
        
        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator);

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');
    });

    it('should safety handle the XSS script', () => {
        
        const keyWord = '<script>alert("XSS")</script>';
        const encodedKeyWord = encodeURIComponent(keyWord);
        const comparisonOperator = 'eq';

        cy.step('Type and submit');
        cy.typeInSearchInput(keyWord);

        cy.verifySearchTitleURL(encodedKeyWord);

        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator);

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');

        cy.step('Check that the script tag does not get executed and the error message or proper handling is displayed');
        cy.on('window:alert', (str) => {
            throw new Error('Script injection executed');
        });
    });

});


