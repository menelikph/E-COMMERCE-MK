import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const fakeProducts = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 79.99,
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    },
    {
      id: 2,
      title: "Men's Casual T-Shirt",
      price: 15.99,
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    },
    {
      id: 3,
      title: "Smartwatch with GPS",
      price: 120.0,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-3xl  font-bold mb-8 text-center">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {fakeProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
