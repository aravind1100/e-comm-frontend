import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api.js";
import { AuthContext } from "./AuthContext.jsx";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const{isAuthenticated} = useContext(AuthContext)
  const [cart, setCart] = useState(() => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (err) {
    console.error("Error parsing cart from localStorage:", err);
    return [];
  }
});


  const [loadingCart, setLoadingCart] = useState(true);
   
  
   // Sync to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await API.get("/cart");
      setCart(res.data.items || []);
    } catch (err) {
      console.log("Cart fetch error:", err);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await API.post("/cart/add", { productId, quantity });
      setCart(res.data.items);
    } catch (err) {
      console.log("Add to cart error:", err);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await API.put(`/cart/item/${itemId}`, { quantity });
      setCart(res.data.items);
    } catch (err) {
      console.log("Update quantity error:", err);
    }
  };

  // FIXED LOGIC
  const increaseQty = (itemId) => {
    const item = cart.find((i) => i._id === itemId);
    if (item) updateQuantity(itemId, item.quantity + 1);
  };

  const decreaseQty = (itemId) => {
    const item = cart.find((i) => i._id === itemId);
    if (item && item.quantity > 1) updateQuantity(itemId, item.quantity - 1);
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await API.delete(`/cart/item/${itemId}`);
      setCart(res.data.items);
    } catch (err) {
      console.log("Remove cart item error:", err);
    }
  };
  // Add this inside CartProvider
  const clearCart = async () => {
  try {
    // Optional: if using API to clear server cart
    await API.delete("/cart/clear");
    localStorage.removeItem("cart")
  } catch (err) {
    console.log("Clear cart error:", err);
  } finally {
    setCart([]); // clear local cart
  }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        loadingCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
         clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
