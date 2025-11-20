import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import { FiHeart, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, loadingWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (loadingWishlist) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading wishlist...
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 flex items-center gap-3">
        <FiHeart className="text-pink-600" /> My Wishlist
      </h1>

      {wishlist.products.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">Your wishlist is empty 💔</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {Array.isArray(wishlist?.products) && wishlist.products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition border border-gray-200"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-lg mb-3"
                />
              </Link>

              <Link to={`/product/${product._id}`}>
                <h2 className="text-lg font-semibold hover:text-blue-600 transition">
                  {product.name}
                </h2>
              </Link>

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-green-600 text-lg">
                  ₹{product.price}
                </span>

                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
                >
                  <FiTrash className="text-xl" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product._id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mt-4 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
