import "cypress-xpath";

export class HomePage {
  get nameField(): Cypress.Chainable {
    return cy.xpath("//input[@id='ugyfel_megkereses_nev']");
  }

  get emailField(): Cypress.Chainable {
    return cy.xpath("//input[@id='ugyfel_megkereses_email']");
  }

  get phoneNumberField(): Cypress.Chainable {
    return cy.xpath("//input[@id='ugyfel_megkereses_mobil']");
  }

  get kapcsolat(): Cypress.Chainable {
    return cy.xpath("//h2[text()='Kapcsolat']");
  }
}
export default new HomePage();
