describe("Test game", function() {
  it("can navigate to a game and move around", function() {
    cy.login();
    cy.visit("/new");
    cy.get("#new_emojirama").click();
    cy.wait(1000);
    cy.visit("/emojirama");
    cy.get("#emojirama_live_0").click();
    cy.wait(500);
    cy.get('[data-index="square_2_3"] > .square-wrapper').click();
    // cy.get('[data-index="square_5_8"] > .square-wrapper').click();
  });
});
