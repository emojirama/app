describe("Test Delete Emojirama", function() {
  it("lets a user delete their own emojirama", function() {
    cy.login();
    cy.visit("/new");
    cy.get("#new_emojirama").click();
    cy.wait(500);
    cy.url().then($url => {
      const urlParts = $url.split("/");
      const id = urlParts[urlParts.length - 1];
      cy.visit("/emojirama");
      cy.get(`#delete_emojirama_${id}`).click();
      cy.get(`#confirm_delete_emojirama_${id}`).click();
      // cy.get
    });

    cy.wait(1000);
  });
});
