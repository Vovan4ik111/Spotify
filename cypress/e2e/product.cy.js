
describe('product_page', () => {

    beforeEach(() => {
        cy.step('Request');
        cy.intercept('POST', '/ant_squire').as("ant_squire");
        cy.intercept('POST', '/cart').as("cart");
        cy.step('open homepage');
        cy.visit('/');
        cy.step('Create a variable with a random number from 1 to 6');
        const rnd = Cypress._.random(1, 6);
        cy.step('Wait for ');
        cy.wait('@ant_squire');
        
        cy.step('Randomly select from the Pet Categories');
        cy.get('.grid__item a').eq(rnd).click();

        // lazy load
        cy.scrollTo('bottom');
        cy.wait(7000);
        cy.wait('@ant_squire');

    });

    it('should display product information correctly', () => {

      cy.step('Verify the total number of products');
      cy.get('.collection-filter').find('.collection-filter__item--count').should('be.visible');
      cy.get('div.collection-filter__item--count').invoke('text').invoke('trim').should('not.be.empty');

      cy.step('Ensure that 35 products are visible');
      cy.get('div.grid-product').should('have.length', 35).should('be.visible');

      cy.step('Verify the number of images')
      cy.get('div.grid__image-ratio').should('have.length', 35).should('be.visible');

      cy.step('Verify the number of titles')
      cy.get('div.grid-product__title').should('have.length', 35).should('be.visible');

      cy.step('Verify the number of vendors')
      cy.get('div.grid-product__vendor').should('have.length', 35).should('be.visible');

      cy.step('Verify the number of original prices')
      cy.get('div.grid-product__price').should('have.length.greaterThan', 0).should('be.visible');

      cy.step('Verify the number of the previous prices')
      cy.get('span.grid-product__price--original').should('have.length.greaterThan', 0).should('be.visible');

      cy.step('Verify the number of the sale prices')
      cy.get('span:contains("Sale price")').should('have.length.greaterThan', 0).should('be.visible');

      cy.step('Verify the number of the savings')
      cy.get('span.grid-product__price--savings').should('have.length.greaterThan', 0).should('be.visible');

      cy.step('Verify the number of the sale tags')
      cy.get('.grid-product__tag--sale').should('have.length.greaterThan', 0).should('be.visible');

      cy.step('Verify the number of the sold out tags')
      // cy.get('.grid-product__tag--sold-out').should('have.length.greaterThan', 0).should('be.visible');
      cy.get('div.grid-product').then($products => {
        const soldOutTags = $products.find('.grid-product__tag--sold-out');
        
        if (soldOutTags.length > 0) {
          // If sold-out tags are found, assert their visibility
          cy.wrap(soldOutTags).should('be.visible');
        } else {
          // If no sold-out tags are found, log a custom message
          cy.log('No sold-out tag');
        }
      });      
    });
    
    it('should display specific product information correctly', () => {

        const productImageUrl = 'https://petstore.com/cdn/shop/products/product-image-848512282_180x.jpg?v=1581568682';
        const productTitle = 'Sturdy Basic Nylon Dog Collar with Quick Snap Buckle';
        const productVendor = 'Discount Pet Supply';
        const productOriginalPrice = '$5.99';
        const productSalePrice = 'from $3.49';
        const productSavings = 'Save $2.50';
        const productSale = 'Sale';
        const productSoldOut = 'Sold Out';

        cy.step('Ensure that products are fully loaded');
        cy.get('div.grid-product').should('have.length', 35).should('be.visible');

        cy.step('Verify that specific elements exist on the page');
        cy.get('div.grid-product').then(($products) => {
          
          const imageUrls = [];
          const titles = [];
          const vendors = [];
          const originalPrices = [];
          const salePrices = [];
          const savings = [];
          const sales = [];
          const soldOut = [];
        
          $products.each((index, product) => {
            const imageUrl = Cypress.$(product).find('div.grid__image-ratio').css('background-image')
              .replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        
            const title = Cypress.$(product).find('div.grid-product__title').text().trim();
            const vendor = Cypress.$(product).find('div.grid-product__vendor').text().trim();
            const originalPrice = Cypress.$(product).find('.grid-product__price span.grid-product__price--original').text().trim();
            const salePriceElement = Cypress.$(product).find('span:contains("Sale price")');
              let salePrice = '';
              if (salePriceElement.length > 0 && salePriceElement[0].nextSibling) {
                salePrice = salePriceElement[0].nextSibling.nodeValue.trim();
              }
            const savings_ = Cypress.$(product).find('.grid-product__price span.grid-product__price--savings').text().trim();            
            const sale_ = Cypress.$(product).find('.grid-product__tag--sale').text().trim();
            const soldOut_ = Cypress.$(product).find('.grid-product__tag--sold-out').text().trim();

            imageUrls.push(imageUrl);
            titles.push(title);
            vendors.push(vendor);
            originalPrices.push(originalPrice);
            salePrices.push(salePrice);
            savings.push(savings_);
            sales.push(sale_);
            soldOut.push(soldOut_);
          });
          // Log for debugging
          // cy.log('Captured elements:', JSON.stringify(salePrices));
        
          // Perform assertions
          expect(imageUrls).to.include(productImageUrl);
          expect(titles).to.include(productTitle);
          expect(vendors).to.include(productVendor);
          expect(originalPrices).to.include(productOriginalPrice);
          expect(salePrices).to.include(productSalePrice);
          expect(savings).to.include(productSavings);
          expect(sales).to.include(productSale);
          expect(soldOut).to.include(productSoldOut);
        });
      });    

});
