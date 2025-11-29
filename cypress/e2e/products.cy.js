describe("Página de productos", () => {
  it("Carga los productos correctamente", () => {
    cy.visit("/products");

    cy.contains("Products").should("exist");

    // Verifica que aparezcan productos renderizados
    cy.get("article").should("have.length.at.least", 1);
  });
});
