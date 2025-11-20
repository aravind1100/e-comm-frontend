import { useContext, useRef } from "react";
import Modal from "./Components/Authentication/Modal";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Components/User_Dashboard/Dashboard";
import { AuthContext } from "./Context/AuthContext";
import CartPage from "./Components/Cart";
import ProductDetails from "./Components/ProductDetails";
import Wishlist from "./Components/Wishlist";
import Checkout from "./Components/Checkout";
import CategoryProducts from "./Components/CategoryProducts";
import Product from "./Components/Product";
import CategoryPage from "./Components/User_Dashboard/CategoryPage";
import Profile from "./Components/User_Dashboard/Profile";
import MyOrders from "./Components/User_Dashboard/MyOrders";

const App = () => {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/modal?mode=login" replace />;
  };

  const aboutRef = useRef(null);
  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar aboutRef={aboutRef} scrollToRef={scrollToRef} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/*Its not a dashboard,just fetches products */}
        
        {/* Correct category route */}
        <Route path="/category/:slug" element={<CategoryProducts />} />

        <Route path="/category-page" element={<CategoryPage />} />
        <Route path="/product" element={<Product />} />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myorders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer aboutRef={aboutRef} />
    </div>
  );
};

export default App;
