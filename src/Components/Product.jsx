import ProductCard from "./ProductCard.jsx";
import { useProduct } from "../Context/ProductContext.jsx";

const Product = () => {
  const { products, loading } = useProduct();

  if (loading)
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-indigo-500 rounded-full"></div>
      </div>
    );

  return (
    <div className="w-full max-w-8xl mx-auto p-4 sm:p-6">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-800 text-center drop-shadow-md tracking-wide">
          All Products
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Explore our latest and trending items 🔥
        </p>
      </div>

      {/* Product Grid */}
      <div
        className="
          grid grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          xl:grid-cols-3 
          gap-6 
          sm:gap-7 
          md:gap-8
        "
      >
        {Array.isArray(products) && products.length > 0 ? (
         products.map((p) => <ProductCard key={p._id} product={p} />)
         ) : (
          <p className="text-center col-span-full text-gray-600 py-10">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
