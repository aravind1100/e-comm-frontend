import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { Trash2 } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();
  // FIX: calculate total using correct fields
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

const handleCheckout = () => {
  navigate("/checkout", {
    state: { cart }, // send whole cart array
  });
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          🛍️ Your Shopping Cart
        </h2>

        {/* Empty */}
        {cart.length === 0 && (
          <div className="text-center py-20 text-gray-600 text-lg font-medium">
            Your cart is empty 🙁
          </div>
        )}

        {/* Items */}
        <div className="space-y-6">
  {(cart || []).map((item) => (
    <div
      key={item._id}
      className="grid grid-cols-1 sm:grid-cols-3 items-center 
      bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200 gap-6"
    >
      {/* Product Info */}
      <div className="flex items-center gap-4">
        <img
          src={item.product.images?.[0]}
          alt={item.product.name}
          className="h-20 w-20 object-cover rounded-lg shadow-md"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {item.product.name}
          </h3>
          <p className="text-gray-600 font-medium">₹{item.product.price}</p>
        </div>
      </div>

      {/* Qty Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => decreaseQty(item._id)}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300
          rounded-full text-xl font-bold transition"
        >
          -
        </button>

        <span className="text-xl font-semibold min-w-[30px] text-center">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQty(item._id)}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300
          rounded-full text-xl font-bold transition"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <div className="flex justify-end">
        <button
          onClick={() => removeFromCart(item._id)}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 
          text-white px-4 py-2 rounded-lg transition shadow-md"
        >
          <Trash2 size={18} />
          Remove
        </button>
      </div>
    </div>
  ))}
</div>


        {/* Total */}
        {cart.length > 0 && (
          <>
            <div className="mt-10 flex items-center justify-between border-t pt-6">
              <h3 className="text-2xl font-bold text-gray-900">Total</h3>
              <p className="text-3xl font-extrabold text-green-600">
                ₹{cartTotal.toFixed(2)}
              </p>
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white
                py-4 rounded-xl text-lg font-semibold shadow-lg transition"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
