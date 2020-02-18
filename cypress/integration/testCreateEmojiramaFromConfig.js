describe("test create emojirama from config", function() {
  it("can create an emojirama config and generate a new emojirama from it", function() {
    cy.login();
    cy.visit("/new");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    cy.get("#color-input").type("#1166");
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("95");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    cy.get("#color-input").type("#aadd");
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("75");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    cy.get("#color-input").type("#4545");
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("55");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    cy.get("#color-input").type("#cccc");
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("35");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    cy.get("#color-input").type("#1234");
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("25");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    cy.get("#color-input").type("#3456");
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("15");

    cy.get("#new-emojirama-from-config").click();
  });
});
