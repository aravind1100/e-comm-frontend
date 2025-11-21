import { useNavigate } from "react-router-dom";
import { useProduct } from "../Context/ProductContext";

const FeaturedProducts = () => {
  const { allProducts, loading } = useProduct();
  const navigate = useNavigate();

  // Filter featured products from allProducts
 const featuredProducts = (allProducts || []).filter(p => p.featured);


  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <p className="text-center mt-10">Loading featured products...</p>;

  if (featuredProducts.length === 0)
   
    return <p className="text-center mt-10">No featured products available.</p>;

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-green-800 text-center drop-shadow-md tracking-wide pb-5 md:pb-15">
        Featured Products
      </h1>

      <div
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2 
          md:grid-cols-3
          gap-6
          justify-items-center
        "
      >
        {featuredProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            className="
              relative cursor-pointer
              bg-white rounded-xl overflow-hidden
              shadow-md hover:shadow-xl
              transition duration-300 group
            "
          >
            {/* Product Image */}
            <div className="h-56 sm:h-44 md:h-80 overflow-hidden rounded-xl">
              <img
               src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="
                  w-full h-full object-cover 
                  transition-transform duration-500 
                  group-hover:scale-110
                "
              />
            </div>

            {/* Product Name */}
            <div className="py-2 text-center">
              <p className="text-sm font-medium text-gray-700 truncate">
                {product.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedProducts;
