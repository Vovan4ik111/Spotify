class loginPage {

    //get Email Field
    getUserEmailField() {
        return cy.get('#CustomerEmail');
      }
    //get Password Field
    getUserPasswordField() {
        return cy.get('#CustomerPassword');
      }
    //get Sign In button
    getSignInButton() {
        return cy.get('button.btn.btn--full');
      }
}

export default loginPage;
