describe("Test game", function() {
  it("can navigate to a game and move around", function() {
    cy.login();
    cy.visit("/game?cy=true");
    cy.wait(500);
    cy.get('[data-index="square_2_3"] > .square-wrapper').click();
    cy.get('[data-index="square_5_8"] > .square-wrapper').click();
    cy.get("body").trigger("keydown", { key: "s" });
    cy.wait(100);
    cy.get("body").trigger("keydown", { key: "s" });
    cy.wait(100);
    cy.get("body").trigger("keydown", { key: "s" });
    cy.wait(100);
    cy.get("body").trigger("keydown", { key: "s" });
    cy.wait(100);
    cy.get("body").trigger("keydown", { key: "s" });
    cy.wait(100);
    cy.get("body").trigger("keydown", { key: "s" });
    cy.wait(100);
    cy.get("body").trigger("keydown", { key: "s" });
    cy.wait(100);
    cy.get("body").trigger("keydown", { key: "s" });
    cy.wait(400);
  });
});
