
describe('SignIn', () => {

    beforeEach(() => {
        // run these tests as if in a desktop
        // browser with a 720p monitor
        //cy.viewport(1280, 720);

        //visit homepage
        cy.visit('/account/login');
    });

    it('should log in the existed user', () => {

        cy.loginUser('John', 'Doe', 'caxev69353@atebin.com', 'MyPassword2024');

            //reCaptcha issue
            //Open account info
            //cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();
    
            //Verify URL for account
            //cy.url().should('include', '/account');
            //Verify user name
            //cy.get('.h5').should('have.text', firstName + ' ' + lastName);

        
    });
    
    it('should show an error message for non-registered users during login', () => {
        // Usage with dynamic email
        const dynamicEmail = `username${Date.now()}@gmail.com`;
        cy.loginUser('', '', dynamicEmail, 'myPassword');

        //Verify error message
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');
    });

    it('should display an error message for empty fields', () => {

        cy.loginUser('', '', '', 'MyPassword2024');

        //Verify error message
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');

        cy.reload();

        cy.loginUser('', '', 'caxev69353@atebin.com', '');

        //Verify error message
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');

    });

    it('should fail with incorrect password', () => {

        cy.loginUser('', '', 'caxev69353@atebin.com', 'MyPassword');
        //Verify error message
        //cy.get('.errors ul li').should('have.text', 'Incorrect email or password.');

    });

    
});
