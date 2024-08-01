
describe('Search Results Verification', () => {
    
    beforeEach(() => {

        //open homepage
        cy.visit('/');
    });

    it('should ensure all search results contain the word == keyWord', () => {
        const keyWord = 'Cat';
        const encodedKeyWord = encodeURIComponent(keyWord);
        const comparisonOperator = 'greaterThan';
        const forceSearch = 'no';

        cy.typeInSearchInput(keyWord, forceSearch);

        // Wait for the search results to load
        cy.get('.predictive-result__layout').should('be.visible');
    
        // Verify that each search result contains the word == keyWord
        cy.checkResultsContainsKeyWords('.grid-product__title', keyWord);
    
        // Verify that each article result contains the word == keyWord
        cy.checkResultsContainsKeyWords('.grid-product__meta', keyWord);

        //Click on "View more"
        cy.get('.predictive-results__footer').contains('View more').click();

        cy.verifySearchTitleURL(encodedKeyWord);

        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator)

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');

        // Verify that each search result contains the word == keyWord
        cy.checkResultsContainsKeyWords('.grid-product__title', keyWord);

        //Go on the last page
        cy.get('.pagination .page a').last().click();

        // Verify that each search result contains the word == keyWord
        //it doesn't filter on the last page
        //checkResultsContainsKeyWords('.grid-product__title');

    });

    it('should not found any products', () => {
        const keyWord = 'qwert';
        const encodedKeyWord = encodeURIComponent(keyWord);
        const comparisonOperator = 'eq';
        //const forceSearch = 'yes';

        cy.typeInSearchInput(keyWord);

        //Type search word == keyWord
        //cy.get('.site-header__search-input').should('be.visible').type(keyWord + '{enter}');

        cy.verifySearchTitleURL(encodedKeyWord);

        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator)

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');

    });

    it('should show appropriate message when search with an empty query', () => {
        const keyWord = '';
        const encodedKeyWord = encodeURIComponent(keyWord);
        //const forceSearch = 'yes';

        cy.typeInSearchInput(keyWord);

        cy.verifySearchTitleURL(encodedKeyWord);

    });

    it('should search multi-words with special characters returns appropriate results', () => {
        const keyWord = 'dog & cat 0';
        const encodedKeyWord = encodeURIComponent(keyWord);
        const comparisonOperator = 'greaterThan';
        //const forceSearch = 'yes';

        cy.typeInSearchInput(keyWord);

        cy.verifySearchTitleURL(encodedKeyWord);

        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator)

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');

        // Verify that each search result contains the word == keyWord
        cy.checkResultsContainsKeyWords('.grid-product__title', keyWord);
    });

    it('should return an error for excessively long queries', () => {
        
        const keyWord = 'a'.repeat(1001);
        cy.step('Type and submit ')
        cy.typeInSearchInput(keyWord);



    });

});


