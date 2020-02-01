describe("Update profile", function() {
  it("can update the user profile", function() {
    cy.login();
    cy.visit("/");
    cy.get("#profile-button").click({ force: true });
    cy.get("#edit-profile-button").click();
    cy.get(".select-emoji-button").click({ force: true });
    cy.get(
      "[data-index='0'] > .emoji-mart-category > [data-title='hankey']"
    ).click();
    cy.get("#save-button").click({ force: true });
  });
});
