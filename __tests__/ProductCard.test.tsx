import ProductCard from "@/components/products/ProductCard";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock fijo para todos los tests
const addToCartMock = jest.fn();

jest.mock("@/context/CartContext", () => ({
  useCart: () => ({
    addToCart: addToCartMock,
  }),
}));

const product = { 
  _id: "1", 
  name: "Producto Test", 
  price: 20, 
  imageUrl: "test.jpg" 
};

describe("ProductCard", () => {
  beforeEach(() => {
    addToCartMock.mockClear();
  });

  test("muestra el nombre y precio del producto", () => {
    render(<ProductCard {...product} />);

    expect(screen.getByText("Producto Test")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
  });

  test("llama addToCart cuando se hace click", () => {
    render(<ProductCard {...product} />);

    fireEvent.click(screen.getByText("Add to cart"));

    expect(addToCartMock).toHaveBeenCalledWith(product);
  });
});
