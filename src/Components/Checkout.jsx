import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import API from "../utils/api";

const Checkout = () => {
  const [paymentStatus, setPaymentStatus] = useState("idle"); 
  const { cart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we have a cart or buyNowProduct
  const buyNowProduct = location.state?.product || null;
  const cartItems = location.state?.cart || null;

  // Normalize checkout items
  const checkoutItems = buyNowProduct
    ? [
        {
          id: buyNowProduct._id,
          name: buyNowProduct.name,
          price: Number(location.state.price || buyNowProduct.price || 0),
          qty: Number(location.state.qty || 1),
        },
      ]
    : cartItems
    ? (Array.isArray(cartItems) ? cartItems : []).map((item) => ({
        id: item.product._id,
        name: item.product.name,
        price: Number(item.product.price || 0),
        qty: Number(item.quantity || 1),
      }))
    : [];

  const totalPrice = Number(
  checkoutItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)
);


  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayNow = async () => {
    if (!form.fullName || !form.phone || !form.address || !form.city || !form.postalCode) {
      alert("Please fill all required fields");
      return;
    }
     setPaymentStatus("loading"); 
    const orderData = {
      items: checkoutItems,
      shipping: form,
      totalAmount: totalPrice,
      date: new Date().toISOString(),
    };

    try {
      const response = await API.post("/orders", orderData);

      if (response.status === 201 || response.status === 200) {
         setPaymentStatus("success");
       
        if (!buyNowProduct) clearCart(); // clear cart only if normal cart checkout
         setTimeout(() => {
        navigate("/myorders");
      }, 1500);
      } else {
        setPaymentStatus("idle");
        alert("Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
        setPaymentStatus("idle");
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">Checkout</h1>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
          <div className="space-y-4">
            <label className="block">
              Full Name <span className="text-red-500">*</span>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </label>

            <label className="block">
              Phone Number <span className="text-red-500">*</span>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </label>

            <label className="block">
              Address <span className="text-red-500">*</span>
              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mt-1"
                rows="3"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                City <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1"
                />
              </label>

              <label className="block">
                Postal Code <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={form.postalCode}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1"
                />
              </label>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={form.paymentMethod === "upi"}
                  onChange={handleChange}
                />
                UPI
              </label>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={handleChange}
                />
                Credit / Debit Card
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4 flex-grow">
            {(Array.isArray(checkoutItems) ? checkoutItems : []).map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.qty}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg mt-6 border-t pt-4">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>

         <button
  onClick={handlePayNow}
  disabled={paymentStatus === "loading" || paymentStatus === "success"}
  className={`w-full mt-6 py-3 rounded-lg text-lg font-semibold transition flex items-center justify-center gap-2
    ${paymentStatus === "success" ? "bg-green-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"}
  `}
>
  {paymentStatus === "idle" && "Pay Now"}
  {paymentStatus === "loading" && (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  )}
  {paymentStatus === "success" && (
    <>
      <span>Paid</span>
      <span className="text-xl">✅</span>
    </>
  )}
</button>

        </div>

      </div>
    </div>
  );
};

export default Checkout;
