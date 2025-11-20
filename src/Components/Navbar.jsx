import { useState, useContext, useEffect } from "react";
import {
  FiHome,
  FiMenu,
  FiShoppingCart,
  FiUser,
  FiMail,
  FiLogOut,
  FiHeart,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import { TbCategoryPlus } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import Searchbar from "./Searchbar";
import { SearchContext } from "../Context/SearchContext";

const Navbar = ({ aboutRef, scrollToRef }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { searchTerm } = useContext(SearchContext);
  const hasSearch = searchTerm.trim() !== "";

  // Pages where searchbar should be hidden
  const hiddenSearchPages = [
    "/checkout",
    "/myorders",
    "/profile",
    "/cart",
    "/wishlist",
    "/product/",
    "/category/",
  ];

  // Check if search should be hidden (works for dynamic routes)
  const hideSearch = hiddenSearchPages.some((pattern) =>
    location.pathname.startsWith(pattern)
  );

  useEffect(() => {
    if (hasSearch) setMenuOpen(false);
  }, [hasSearch]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    isAuthenticated ? navigate("/profile") : navigate("/modal?mode=login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50 w-full">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 cursor-pointer 
                       group transition-all duration-200"
            onClick={() => navigate("/")}
          >
            <img
              src="\assets\logo.png"
              alt="Shopperz Stop Logo"
              className="w-15 h-15 sm:w-25 sm:h-25 object-contain 
                         transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-md sm:text-2xl font-extrabold tracking-tight 
                             text-green-600 group-hover:text-green-800 
                             transition-all duration-300">
              Shopperz Stop
            </span>
          </div>

          {/* Desktop Search */}
          {!hideSearch && (
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <Searchbar />
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => navigate("/")}
            >
              <FiHome className="text-lg" />
              <span className="text-sm">Home</span>
            </button>

            <button
              className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => navigate("/category-page")}
            >
              <TbCategoryPlus className="text-lg" />
              <span className="text-sm">Categories</span>
            </button>

            <button
              className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => navigate("/dashboard")}
            >
              <FiShoppingBag className="text-lg" />
              <span className="text-sm">Shop</span>
            </button>

            <button
              className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => scrollToRef(aboutRef)}
            >
              <FiMail className="text-lg" />
              <span className="text-sm">About Us</span>
            </button>
          </div>

          {/* Desktop User + Cart */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 font-medium">
                  Hello, <span className="text-blue-700">{user?.username || "User"}</span>
                </span>

                <button
                  className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => navigate("/myorders")}
                >
                  <FiShoppingBag className="text-xl" />
                </button>

                <button
                  className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={handleProfileClick}
                >
                  <FiUser className="text-xl" />
                </button>

                <button
                  className="p-2 relative text-gray-700 hover:text-pink-600 transition-colors"
                  onClick={() => navigate("/wishlist")}
                >
                  <FiHeart className="text-xl" />
                  {wishlist?.products?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {wishlist.products.length}
                    </span>
                  )}
                </button>

                <button
                  className="p-2 relative text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => navigate("/cart")}
                >
                  <FiShoppingCart className="text-xl" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {cart.length}
                    </span>
                  )}
                </button>

                <button
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                  onClick={handleLogout}
                >
                  <FiLogOut className="text-xl" />
                </button>
              </div>
            ) : (
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 
                           hover:bg-green-600 hover:text-white border border-gray-300 rounded-lg shadow-sm 
                           transition-all duration-300 font-medium"
                onClick={() => navigate("/modal?mode=login")}
              >
                <FiUser className="text-xl" />
                <span className="text-sm">Login / Signup</span>
              </button>
            )}
          </div>

          {/* Mobile: Wishlist, Cart, Menu */}
          <div className="flex lg:hidden items-center space-x-2">
            {isAuthenticated && (
              <>
                <button
                  className="p-2 relative text-gray-700"
                  onClick={() => navigate("/wishlist")}
                >
                  <FiHeart className="text-xl" />
                  {wishlist?.products?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      {wishlist.products.length}
                    </span>
                  )}
                </button>

                <button
                  className="p-2 relative text-gray-700"
                  onClick={() => navigate("/cart")}
                >
                  <FiShoppingCart className="text-xl" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      {cart.length}
                    </span>
                  )}
                </button>
              </>
            )}
            <button className="p-2 text-gray-700" onClick={toggleMenu}>
              {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {!hideSearch && (
          <div className="lg:hidden pb-3">
            <Searchbar />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-gray-50">
          <div className="px-4 py-4 space-y-2">
            <button
              className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-white rounded-lg transition-colors"
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              <FiHome className="mr-3 text-green-600 text-xl" />
              <span>Home</span>
            </button>

            <button
              className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-white rounded-lg transition-colors"
              onClick={() => {
                navigate("/dashboard")
                setMenuOpen(false)
              }} 
            >
              <TbCategoryPlus className="mr-3 text-green-600 text-xl" />
              <span>Categories</span>
            </button>

            <button
              className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-white rounded-lg transition-colors"
              onClick={() => {
                navigate("/dashboard");
                setMenuOpen(false);
              }}
            >
              <FiShoppingBag className="mr-3 text-green-600 text-xl" />
              <span>Shop</span>
            </button>

            <button
              className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-white rounded-lg transition-colors"
              onClick={() => {
                scrollToRef(aboutRef);
                setMenuOpen(false);
              }}
            >
              <FiMail className="mr-3 text-green-600 text-xl" />
              <span>About Us</span>
            </button>

            <div className="border-t border-gray-200 my-2"></div>

            {/* Logged in */}
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 bg-blue-50 rounded-lg mb-2">
                  <p className="text-sm text-gray-600">Welcome,</p>
                  <p className="font-semibold text-gray-900">
                    {user?.username}
                  </p>
                </div>

                <button
                  className="flex items-center w-full px-3 py-2.5 text-amber-800 hover:bg-white rounded-lg transition-colors"
                  onClick={handleProfileClick}
                >
                  <FiUser className="mr-3 text-xl" />
                  <span>My Profile</span>
                </button>
                <button
                    className="flex items-center w-full px-3 py-2.5 text-green-600 hover:bg-white rounded-lg transition-colors"
                    onClick={() => {
                      navigate("/myorders");
                      setMenuOpen(false);
                    }}
                  >
                    <FiShoppingBag className="mr-3 text-xl" /> {/* Use any suitable icon */}
                    <span>My Orders</span>
                  </button>
                <button
                  className="flex items-center w-full px-3 py-2.5 text-red-600 hover:bg-white rounded-lg transition-colors"
                  onClick={handleLogout}
                >
                  <FiLogOut className="mr-3 text-xl" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                className="flex items-center w-full px-3 py-2.5 text-green-600 hover:bg-white rounded-lg transition-colors"
                onClick={() => {
                  navigate("/modal?mode=login");
                  setMenuOpen(false);
                }}
              >
                <FiUser className="mr-3 text-xl" />
                <span>Login/Signup</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
