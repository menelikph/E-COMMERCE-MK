import ProductsPage from "./products/page";



export default function Home() {
  
  return (
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-3xl  font-bold mb-8 text-center">
        home
        <p className="text-9xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quia nostrum rerum nihil mollitia iste ex ipsa, porro molestiae ad eum harum unde aspernatur nemo qui veniam culpa maiores enim!</p>
      </h1>

      <ProductsPage/> 
    </div>
  );
}
