describe("Modificar cantidades", () => {
  beforeEach(() => {
    cy.visit("/products");
    cy.contains("Add to cart").first().click();
    cy.visit("/cart");
  });

  it("Aumenta cantidad", () => {
    cy.contains("+").click();

    cy.get("[data-testid='item-qty']").should("contain", "2");
  });

  it("Disminuye cantidad y elimina si llega a 0", () => {
    cy.contains("-").click();

    cy.get("article").should("have.length", 0);
  });
});
