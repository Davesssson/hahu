describe("template spec2", () => {
  it("first", () => {
    cy.visit("https://example.cypress.io/");
    cy.get('a:contains("within")').click();
    expect(true).to.be.true;
  });

  it("second", () => {
    cy.visit("https://example.cypress.io/");
    expect(false).to.be.true;
  });
});
