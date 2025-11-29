/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/app/context/CartContext";

const wrapper = ({ children }: any) => <CartProvider>{children}</CartProvider>;
beforeEach(() => {
  localStorage.clear();
});

describe("CartContext", () => {
  test("agrega un producto al carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        _id: "1",
        name: "Producto Test",
        price: 10,
        imageUrl: "test.jpg",
      });
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].qty).toBe(1);
  });

  test("aumenta la cantidad si el producto ya existe", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        _id: "1",
        name: "Producto Test",
        price: 10,
        imageUrl: "test.jpg",
      });
      result.current.addToCart({
        _id: "1",
        name: "Producto Test",
        price: 10,
        imageUrl: "test.jpg",
      });
    });

    expect(result.current.cart[0].qty).toBe(2);
  });

  test("elimina un producto del carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        _id: "1",
        name: "Producto Test",
        price: 10,
        imageUrl: "test.jpg",
      });

      result.current.removeFromCart("1");
    });

    expect(result.current.cart.length).toBe(0);
  });

  test("clearCart vacía todo el carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        _id: "1",
        name: "Producto Test",
        price: 10,
        imageUrl: "test.jpg",
      });

      result.current.addToCart({
        _id: "2",
        name: "Producto Test 2",
        price: 20,
        imageUrl: "test2.jpg",
      });

      result.current.clearCart();
    });

    expect(result.current.cart.length).toBe(0);
  });

  test("increaseQty aumenta cantidad", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        _id: "1",
        name: "Producto Test",
        price: 10,
        imageUrl: "test.jpg",
      });

      result.current.increaseQty("1");
    });

    expect(result.current.cart[0].qty).toBe(2);
  });

  test("decreaseQty disminuye cantidad y elimina si llega a 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        _id: "1",
        name: "Producto Test",
        price: 10,
        imageUrl: "test.jpg",
      });

      result.current.decreaseQty("1");
    });

    expect(result.current.cart.length).toBe(0);
  });
});
