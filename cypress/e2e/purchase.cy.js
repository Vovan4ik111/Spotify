
describe('Add an item in the cart', () => {
    
    beforeEach(() => {
        // Request
        cy.intercept('POST', '/ant_squire').as("ant_squire")

        //Open homepage
        cy.visit('/')
    });

    it('Add an item in the cart', () => {
        //Create a variable with a random number from 0 to 5 
        const rnd = Cypress._.random(1, 6);

        //Wait for 
        cy.wait('@ant_squire');
        
        // Get all the items and click on the one at the random index
        cy.get('.grid__item a').eq(rnd).then($item => {
        // Extract the text of the selected item
        const selectedItemText = $item.find('.collection-item__title span').text();
  
        // Save the selected item text
        cy.wrap(selectedItemText).as('selectedItemText');
  
        // Click on the selected item
        cy.wrap($item).click();
      });

        // compare selected section name and current section name
        cy.get('@selectedItemText').then(selectedItemText => {
        //Verify URL that matches the selected section
        cy.url().should('include', selectedItemText.toLowerCase().trim().replace(' ', '-').replace(' ', '').replace('&', ''));  
        cy.get('.section-header__title').invoke('text').should('include', selectedItemText.trim());
      });

        //Verify at least one product exists on the page
        cy.get('.collection-filter').should('exist');

        //Select the 3rd item 
        cy.get('.grid-product__meta').eq(2).then($product => {
            // Extract the text of the selected item
            const selectedProductText = $product.find('.grid-product__title').text();
    
            // Save the selected item text as a Cypress alias
            cy.wrap(selectedProductText).as('selectedProductText');
    
            // Click on the selected item
            cy.wrap($product).click();
        })

        // compare selected section name and current section name
        cy.get('@selectedProductText').then(selectedProductText => {
            //Verify URL that matches the selected section
            cy.url().should('include', '/products');  
            cy.get('.product-single__title').invoke('text').should('include', selectedProductText);
          });

        //Click on Add to cart button
        cy.get('[type="submit"]').contains('Add to cart').click();

        // compare selected section name and current section name
        cy.get('@selectedProductText').then(selectedProductText => {
            cy.get('.ajaxcart__product-name--wrapper a').invoke('text').should('include', selectedProductText);
        });

        //Click on Check Out button
        cy.get('[type="submit"]').contains('Check out').click();

    });
});
