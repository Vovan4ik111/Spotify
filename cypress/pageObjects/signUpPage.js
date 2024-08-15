class signUpPage {
    //get First Name Field
    getUserFirstNameField() {
        return cy.get('#FirstName');
      }
    //get Last Name Field
    getUserLastNameField() {
        return cy.get('#LastName');
      }
    //get Email Field
    getUserEmailField() {
        return cy.get('#Email');
      }
    //get Password Field
    getUserPasswordField() {
        return cy.get('#CreatePassword');
      }
    //get Create button
    getCreateButton() {
        return cy.get('input[type="submit"]');
      }
}

export default signUpPage;
