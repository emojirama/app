describe("Test New Emojirama", function() {
  it("Can create a new emojirama", function() {
    cy.login();
    cy.visit("/new");
    cy.get("#new_emojirama").click();
    cy.visit("/emojirama");
    cy.get("#emojirama_0").click();
    cy.wait(1000);
    cy.url().then($url => {
      cy.visit(`${$url}?cy=true`);
      cy.get('[data-index="square_2_3"] > .square-wrapper').click();
    });
    cy.get("#save_button").click();
    cy.contains("saved");
    cy.wait(1000);
  });
});
