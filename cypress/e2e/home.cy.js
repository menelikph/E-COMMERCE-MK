describe("Página principal", () => {
  it("Carga correctamente la Home", () => {
    cy.visit("/");

    cy.contains("MkStore").should("exist");
  });
});
