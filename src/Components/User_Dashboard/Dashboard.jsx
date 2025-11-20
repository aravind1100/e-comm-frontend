import { useContext } from "react";
import CategoryPage from "./CategoryPage";

import Product from "../Product";
import { SearchContext } from "../../Context/SearchContext";
import FilteredProductsPage from "../FilteredProductsPage.jsx";


const Dashboard = () => {
  const { searchTerm } = useContext(SearchContext);
  const hasSearch = searchTerm.trim() !== "";

  return (
    <div className="px-4 sm:px-8 lg:px-12 mt-6 mb-10 space-y-10">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                      rounded-2xl p-6 sm:p-8 shadow-lg text-center text-white">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
          Welcome to <span className="text-yellow-300">Shopperz Stop</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base opacity-90">
          Enjoy the shopping experience with amazing deals ✨
        </p>
      </div>

      {/* Category Section (hide during search) */}
      {!hasSearch && (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Unique Collections !
          </h2>
          <CategoryPage />
        </div>
      )}

      {/* Products Section */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          {hasSearch ? "Search Results" : "Trending Products"}
        </h2>

        {/* Search handling */}
        {hasSearch ? <FilteredProductsPage /> : <Product />}
      </div>
    </div>
  );
};

export default Dashboard;
