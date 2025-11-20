import { FiSearch } from "react-icons/fi";
import { useState, useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import { useProduct } from "../Context/ProductContext";

const Searchbar = () => {
  const { setSearchTerm } = useContext(SearchContext);
  const { filterByCategory } = useProduct();
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    setSearchTerm(value);
    filterByCategory(null); // ALWAYS reset category filtering
  };

  return (
    <div className="mt-4 md:mt-3 md:flex flex-1 max-w-lg mx-8">
      <div className="relative w-full">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Search products..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:ring focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Searchbar;
