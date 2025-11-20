import { useEffect, useState } from "react";
import API from "../../utils/api";


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's orders
  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders/user");
      if (response.status === 200) {
        setOrders(response.data.orders);
      } else {
        alert("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      alert("Something went wrong while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  if (!orders.length)
    return (
      <div className="text-center mt-20 text-lg font-semibold text-gray-600">
        You have no orders yet.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
        My Orders
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">
        {(orders || []).map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "Processing"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "Shipped"
                    ? "bg-indigo-100 text-indigo-800"
                    : order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3 border-t pt-3">
              {(order.items || []).map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.qty} | Price: ₹{item.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold text-lg mt-4 border-t pt-3">
              <span>Total Amount:</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>

            {/* Shipping Info */}
            <div className="mt-3 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Name:</span> {order.shipping.fullName}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {order.shipping.phone}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {order.shipping.address},{" "}
                {order.shipping.city} - {order.shipping.postalCode}
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {order.shipping.paymentMethod.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
