import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api.js";
import { AuthContext } from "./AuthContext.jsx";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState({ products: [] }); // default to empty array
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setLoadingWishlist(false);
      return;
    }
    try {
      const res = await API.get("/wishlist");
      setWishlist(res.data || { products: [] });
    } catch (err) {
      console.log("Wishlist fetch error:", err);
    } finally {
      setLoadingWishlist(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  // Add product to wishlist
  const addToWishlist = async (productId) => {
    try {
      const res = await API.post("/wishlist/add", { productId });
      setWishlist(res.data);
    } catch (err) {
      console.log("Wishlist add error:", err);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const res = await API.delete(`/wishlist/remove/${productId}`);
      setWishlist(res.data);
    } catch (err) {
      console.log("Wishlist remove error:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loadingWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
