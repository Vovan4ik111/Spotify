
describe('Search Results Verification', () => {
    
    beforeEach(() => {

        //open homepage
        cy.visit('/');
    });

    it('should ensure all search results contain the word == searchWord', () => {
        const searchWord = 'Cat';
        const encodedSearchWord = encodeURIComponent(searchWord);
        const comparisonOperator = 'greaterThan';
        const forceSearch = 'no';

        cy.typeInSearchInput(searchWord, forceSearch);

        // Wait for the search results to load
        cy.get('.predictive-result__layout').should('be.visible');
    
        // Verify that each search result contains the word == searchWord
        cy.checkResultsContainsSearchWords('.grid-product__title', searchWord);
    
        // Verify that each article result contains the word == searchWord
        cy.checkResultsContainsSearchWords('.grid-product__meta', searchWord);

        //Click on "View more"
        cy.get('.predictive-results__footer').contains('View more').click();

        cy.verifySearchTitleURL(encodedSearchWord);

        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator)

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');

        // Verify that each search result contains the word == searchWord
        cy.checkResultsContainsSearchWords('.grid-product__title', searchWord);

        //Go on the last page
        cy.get('.pagination .page a').last().click();

        // Verify that each search result contains the word == searchWord
        //it doesn't filter on the last page
        //checkResultsContainsSearchWords('.grid-product__title');

    });

    it('should not found any products', () => {
        const searchWord = 'qwert';
        const encodedSearchWord = encodeURIComponent(searchWord);
        const comparisonOperator = 'eq';
        //const forceSearch = 'yes';

        cy.typeInSearchInput(searchWord);

        //Type search word == searchWord
        //cy.get('.site-header__search-input').should('be.visible').type(searchWord + '{enter}');

        cy.verifySearchTitleURL(encodedSearchWord);

        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator)

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');

    });

    it('should show appropriate message when search with an empty query', () => {
        const searchWord = '';
        const encodedSearchWord = encodeURIComponent(searchWord);
        //const forceSearch = 'yes';

        cy.typeInSearchInput(searchWord);

        cy.verifySearchTitleURL(encodedSearchWord);

    });

    it('should search multi-words with special characters returns appropriate results', () => {
        const searchWord = 'dog & cat 0';
        const encodedSearchWord = encodeURIComponent(searchWord);
        const comparisonOperator = 'greaterThan';
        //const forceSearch = 'yes';

        cy.typeInSearchInput(searchWord);

        cy.verifySearchTitleURL(encodedSearchWord);

        cy.checkResultsNumber('nav.breadcrumb', comparisonOperator);
        cy.checkResultsNumber('h2.section-header__title', comparisonOperator)

        cy.compareResultsBetweenBreadcrumbAndSectionHeader('nav.breadcrumb', 'h2.section-header__title');

        // Verify that each search result contains the word == searchWord
        cy.checkResultsContainsSearchWords('.grid-product__title', searchWord);
    });

});


