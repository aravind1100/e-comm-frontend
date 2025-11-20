import { createContext, useContext, useMemo, useState } from "react";
import { useProduct } from "./ProductContext";

export const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const { allProducts } = useProduct(); 
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return allProducts;

    const term = searchTerm.toLowerCase();

    return allProducts.filter((item) =>
      item.name.toLowerCase().includes(term) ||
      item.category.name.toLowerCase().includes(term) 
    );
  }, [searchTerm, allProducts]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredProducts }}>
      {children}
    </SearchContext.Provider>
  );
};
