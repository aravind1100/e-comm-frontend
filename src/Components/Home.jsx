import HeroSection from "./Herosection.jsx";
import Category from "./Category";
import Promotion from "./Promotion";
import FeaturedProducts from "./FeaturedProducts.jsx";
import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import FilteredProductsPage from "./FilteredProductsPage.jsx";

const Home = () => {
  const { searchTerm } = useContext(SearchContext);
  const hasSearch = searchTerm.trim() !== "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO should always show */}
      {!hasSearch && <HeroSection />}

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* LEFT SIDE - Categories */}
        {/* LEFT SIDE - Categories */}
        <div
          className={`
            border-gray-200 p-2 sm:p-6 xl:pr-16
            ${hasSearch ? "hidden lg:block" : "block"}
            lg:w-1/4
          `}
        >
          <h1 className="text-xl md:text-3xl font-bold text-green-800 text-center drop-shadow-md tracking-wide pb-5 md:pb-15">
            Categories
          </h1>
          <div className="space-y-3 sm:space-y-10">
            <Category />
          </div>
        </div>

        {/* RIGHT SIDE - Products Area */}
        <div className="lg:w-3/4 mx-auto py-10">
          {hasSearch ? <FilteredProductsPage /> : <FeaturedProducts />}
        </div>
      </div>

      {/* Promotional Strip */}
      <Promotion />
    </div>
  );
};

export default Home;
