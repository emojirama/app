describe("Test game", function() {
  it("can navigate to a game and move around", function() {
    cy.login();
    cy.visit("/new");
    cy.get("#new_emojirama").click();
    cy.get("#scene_menu").click();
    cy.get("#new_dungeon").click();
    cy.get("#exit_scene_menu").click();
    cy.visit("/emojirama");
  });
});
