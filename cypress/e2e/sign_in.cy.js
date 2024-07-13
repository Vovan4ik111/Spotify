
describe('SignIn', () => {

    beforeEach(() => {
        // run these tests as if in a desktop
        // browser with a 720p monitor
        //cy.viewport(1280, 720);

        //visit homepage
        cy.visit('/');
    });
    
    it('Sign up a new user', () => {
        //Open Login form
        cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();


        //Verify login URL
        cy.url().should('include', '/login');

        //Check if it's Login form
        cy.get('.section-header__title').should('have.text', 'Login');

        const first_name = 'John';
        const last_name = 'Doe';
        const email = 'caxev69353@atebin.com'  
        const password = 'MyPassword2024';

        //Type user's name,last name. email, and password
        cy.get('#CustomerEmail').type(email, {force: true, delay: 100});
        cy.get('#CustomerPassword').type(password);

        //Sign In
        cy.get('button.btn.btn--full').contains('Sign In').click();

        //reCaptcha issue
        //Open account info
        //cy.get('.site-nav__link.site-nav__link--icon.small--hide').click();

        //Verify URL for account
        //cy.url().should('include', '/account');
        //Verify user name
        //cy.get('.h5').should('have.text', first_name + ' ' + last_name);

    });
});
