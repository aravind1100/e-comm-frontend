import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useProduct } from "../Context/ProductContext";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { AuthContext } from "../Context/AuthContext";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, fetchProductById, loading } = useProduct();
  const { isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const isWishlisted = wishlist?.products?.some((p) => p._id === product?._id);

  // Fetch product on mount
  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  // Wishlist toggle
  const toggleWishlist = () => {
    if (!isAuthenticated) {
      alert("Please login to continue.");
      navigate("/modal?mode=login");
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("Please login to continue.");
      navigate("/modal?mode=login");
      return;
    }
    addToCart(product._id, quantity);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      alert("Please login to continue.");
      navigate("/modal?mode=login");
      return;
    }
    navigate("/checkout", {
      state: { product, qty: Number(quantity), price: Number(product.price) },
    });
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const renderStars = (rating) => {
    const full = Math.floor(rating || 0);
    const empty = 5 - full;
    return (
      <>
        {"★".repeat(full)}
        <span className="text-gray-300">{"★".repeat(empty)}</span>
      </>
    );
  };

  if (loading) return <p className="text-center mt-10">Loading product details...</p>;
  if (!product)
    return (
      <div className="text-center mt-20 text-lg font-semibold text-gray-600">
        Product not found
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT — IMAGE */}
        <div className="w-full md:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-xl backdrop-blur bg-white/40 border">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-[340px] sm:h-[420px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          {/* Title + Wishlist */}
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <button
              onClick={toggleWishlist}
              className="p-3 rounded-full bg-white shadow hover:bg-gray-100 hover:scale-110 transition"
            >
              {isWishlisted ? (
                <FaHeart className="text-2xl text-red-500" />
              ) : (
                <FiHeart className="text-2xl" />
              )}
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center text-yellow-400 text-lg">
            {renderStars(product.starRating)}
            <span className="text-gray-600 text-sm ml-2">
              ({product.starRating || 0})
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <p className="text-4xl font-extrabold text-green-600 tracking-wide">
            ₹{product.price}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-lg bg-white shadow">
              <button
                onClick={decreaseQty}
                className="px-4 py-2 text-xl font-bold hover:bg-gray-200 transition"
              >
                -
              </button>
              <span className="px-6 py-2 text-lg font-semibold border-x">
                {quantity}
              </span>
              <button
                onClick={increaseQty}
                className="px-4 py-2 text-xl font-bold hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 rounded-xl font-semibold text-lg shadow-md transition hover:shadow-xl hover:scale-[1.03] bg-gradient-to-r from-blue-600 to-blue-800 text-white"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-xl hover:scale-[1.03] transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
