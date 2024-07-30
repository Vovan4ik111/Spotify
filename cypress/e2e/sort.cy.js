describe('sort features', () => {
    beforeEach(() => {
        cy.step(' Request');
        cy.intercept('POST', '/ant_squire').as("ant_squire");
        cy.intercept('POST', '/cart').as("cart");
        cy.step('open homepage');
        cy.visit('/');
        cy.step('Create a variable with a random number from 1 to 6');
        const rnd = Math.floor(Math.random() * 6 + 1);    
        cy.step('Wait for ');
        cy.wait('@ant_squire');
        
        cy.step(' Get all the items and click on the one at the random index');
        cy.get('.grid__item a').eq(rnd).click();

    });

    it('should verify that best selling sort selected by default', () => {
        
        cy.step('Verify the default sorting is Best selling');
        cy.step(' Check the value attribute of the select element');
        cy.get('#SortBy').should('have.value', 'best-selling');
        cy.step(' Check the text of the selected option');
        cy.get('#SortBy option:selected').should('have.text', 'Best selling');
    });

    it('should select Alphabetically, A-Z and verify the sorting', () => {

        cy.step(' Select the "Alphabetically, A-Z" option from the dropdown');
        cy.get('#SortBy').select('Alphabetically, A-Z');
        cy.step('Verify URL contains 2');
        cy.url().should('include', 'sort_by=title-ascending')

        cy.step(' Get the list of items and verify they are sorted alphabetically A-Z');
        cy.get('.grid-product__title').then(($items) => {
            cy.step(' Extract the text from each item and store it in an array');
            const itemTexts = $items.map((index, el) => Cypress.$(el).text().trim()).get();
            
            cy.step(' Copy the array and sort it alphabetically');
            const sortedItems = [...itemTexts].sort((a, b) => a.localeCompare(b));

            cy.step(' Assert that the original array is equal to the sorted array');
            expect(itemTexts).to.deep.equal(sortedItems);
        });

        cy.get('span.next').click();
    });

    it('should select Alphabetically, Z-A and verify the sorting', () => {


        cy.step(' Select the "Alphabetically, Z-A" option from the dropdown using visible text');
        cy.get('#SortBy').select('Alphabetically, Z-A');
        cy.step('Verify URL contains 2');
        cy.url().should('include', 'sort_by=title-descending')

        cy.step(' Wait for the page to load and sort the items');
        cy.wait(1000); cy.step("Adjust the wait time as necessary based on the application's response time");

        cy.step(' Get the list of items and verify they are sorted alphabetically Z-A');
        cy.get('.grid-product__title').then(($items) => {
            cy.step(' Extract the text from each item and store it in an array');
            const itemTexts = $items.map((index, el) => Cypress.$(el).text().trim()).get();
            
            cy.step(' Copy the array and sort it alphabetically in descending order');
            const sortedItems = [...itemTexts].sort((a, b) => b.localeCompare(a));

            cy.step(' Assert that the original array is equal to the sorted array');
            expect(itemTexts).to.deep.equal(sortedItems);
        });
    });

    it.only('should select "Price, low to high" and verify the sorting', () => {

        cy.step(' Select the "Price, low to high" option from the dropdown');
        cy.get('#SortBy').select('price-ascending');
        cy.step('Verify URL contains price-ascending');
        cy.url().should('include', 'sort_by=price-ascending');

        cy.step(' Retrieve all product prices');
        cy.getProductPrices('.grid-product__price');   

        cy.step(' Verify that the prices are sorted in ascending order');
        cy.getProductPrices('.grid-product').then(prices => {
            const sortedPrices = [...prices].sort((a, b) => a - b);
            expect(prices).to.deep.equal(sortedPrices);
        });
        cy.step('Select page #2 "next" page');
        cy.get('span.next').click();
        cy.step('Verify URL contains 2');
        cy.url().should('include', 'page=2&')

        cy.step(' Retrieve all product prices');
        cy.getProductPrices('.grid-product__price'); 
    });
});
