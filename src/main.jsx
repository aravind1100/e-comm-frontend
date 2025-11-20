import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { WishlistProvider } from "./Context/WishlistContext.jsx";
import { SearchProvider } from "./Context/SearchContext.jsx";
import { ProductProvider } from "./Context/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
       <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>          
              <App />
          </SearchProvider>
        </WishlistProvider>
        </CartProvider>
        </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
);
