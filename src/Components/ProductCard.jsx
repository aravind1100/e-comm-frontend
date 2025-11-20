import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";

import { useWishlist } from "../Context/WishlistContext";
import { AuthContext } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useContext(AuthContext);

  // Wishlist logic
 const isWishlisted = wishlist?.products?.some(p => p._id === product._id);
  const toggleWishlist = () => {
    if (!isAuthenticated) return navigate("/modal?mode=login");
    isWishlisted
      ? removeFromWishlist(product._id)
      : addToWishlist(product._id);
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("Please login to continue.");
      navigate("/modal?mode=login");
      return;
    }
    addToCart(product._id);
  };

  // Buy now
  const handleBuyNow = () => {
    if (!isAuthenticated) return navigate("/modal?mode=login");
    navigate(`/checkout?productId=${product._id}`, { state: { product } });
  };

  // Rating stars
  const starDisplay = useMemo(() => {
    const full = Math.floor(product.ratings || 0);
    const empty = 5 - full;
    return (
      <>
        {"★".repeat(full)}
        <span className="text-gray-300">{"★".repeat(empty)}</span>
      </>
    );
  }, [product.ratings]);

  return (
    <div className="relative bg-white w-full rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group overflow-hidden flex flex-col gap-2">
      {/* Wishlist */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
      >
        {isWishlisted ? (
          <FaHeart className="text-2xl text-red-500" />
        ) : (
          <FiHeart className="text-2xl" />
        )}
      </button>

      {/* Product Image */}
      <div className="h-48 sm:h-56 overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-green-600">₹{product.price}</span>
          <div className="flex items-center space-x-1 text-yellow-400 text-sm">
            <span>{starDisplay}</span>
            <span className="text-gray-500 text-xs">({product.ratings})</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 w-1/2 py-2.5 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-sm"
          >
            <FiShoppingCart className="text-lg" /> Add
          </button>

          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-2 w-1/2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 shadow-sm"
          >
            <span className="text-lg">⚡</span> Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
