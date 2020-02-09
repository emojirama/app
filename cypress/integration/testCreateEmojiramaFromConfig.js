describe("test create emojirama from config", function() {
  it("can create an emojirama config and generate a new emojirama from it", function() {
    // cy.login();
    cy.visit("/new");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    // cy.pause();
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("85");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    cy.pause();
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("75");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    cy.pause();
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("50");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    cy.pause();
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("30");

    cy.get("#add-layer").click();
    cy.get("#art-0").click();
    cy.pause();
    cy.get("#add-color").click();
    cy.get("#layer-level-0").type("5");

    cy.get("#new-emojirama-from-config").click();
    // cy.url().then($url => {
    //   const urlParts = $url.split("/");
    //   const id = urlParts[urlParts.length - 1];
    //   cy.visit("/emojirama");
    //   cy.get(`#delete_emojirama_${id}`).click();
    //   cy.get(`#confirm_delete_emojirama_${id}`).click();
    //   cy.get(`[data-index="emojirama_id_${id}"]`).should("not.exist");
    // });

    cy.wait(1000);
  });
});
