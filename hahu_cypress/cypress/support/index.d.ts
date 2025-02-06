declare namespace Cypress {
    interface Chainable {
      val(): Chainable<string>;  // Return type is string because it retrieves the value of an element
    }
  }