import { useContext } from "react";
import ProductCard from "./ProductCard";
import { SearchContext } from "../Context/SearchContext";

const FilteredProductsPage = () => {
  const { filteredProducts } = useContext(SearchContext);

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
        Products
      </h1>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg font-medium py-10">
          ❌ No matches found
        </p>
      ) : (
        <div
          className="
            grid 
            grid-cols-1
            sm:grid-cols-2 
            md:grid-cols-3 
            xl:grid-cols-4 
            gap-4 sm:gap-5 md:gap-6 xl:gap-8
            pt-10 pb-3
            "
        >
          {filteredProducts.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default FilteredProductsPage;
