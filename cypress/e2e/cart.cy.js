describe("Carrito de compras", () => {
  it("Agrega un producto al carrito y lo muestra en el contador", () => {
    cy.visit("/products");

    // Click a primer botón "Add to cart"
    cy.contains("Add to cart").first().click();

    // Debe ver burbuja en el carrito
    cy.get("a[href='/cart'] span")
      .should("exist")
      .and("contain", "1");
  });

  it("Navega al carrito y ve el producto agregado", () => {
    cy.visit("/cart");

    cy.get("h1").contains("Cart").should("exist");

    cy.get("article").should("have.length.at.least", 1);
  });
});
