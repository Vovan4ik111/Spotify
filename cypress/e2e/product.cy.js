
describe('product_page', () => {

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
        
        cy.step('Randomly select from the Pet Categories');
        cy.get('.grid__item a').eq(rnd).click();

    });
    
    it('should display product details correctly', () => {

        const imageUrl = 'https://petstore.com/cdn/shop/products/product-image-848512282_180x.jpg';
        
        // Variable to track if the URL is found
    let urlFound = false;

    // Find all the image elements and check if one of them contains the URL
    cy.get('.grid__item')
      .find('.grid-product__image-mask')
      .each(($el) => {
        cy.wrap($el)
          .find('div')
          .invoke('attr', 'style')
          .then((style) => {
            // Check if style contains the URL
            if (style && style.includes(imageUrl)) {
              urlFound = true; // Set the flag to true if URL is found
            }
          });
      })
      .then(() => {
        // Assert that the URL was found
        expect(urlFound).to.be.true;
      });

    });
        

});
