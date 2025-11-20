import { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../utils/api.js";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]); // store full product list
  const [products, setProducts] = useState([]);       // filtered list
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load ALL PRODUCTS once
 const fetchProducts = useCallback(async () => {
  try {
    const { data } = await API.get("/products");
    setAllProducts(data.products || []);
    setProducts(data.products || []);
  } catch (err) {
    console.log("Error loading products:", err);
  }
}, []); 


  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter by category
  const filterByCategory = (category) => {
    if (!category) {
      setProducts(allProducts);
      return;
    }
    setProducts(allProducts.filter((p) => p.category?.name === category));
  };

  // Fetch individual product
  const fetchProductById = useCallback(async (id) => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        products,
        product,
        loading,
        error,
        filterByCategory,
        fetchProductById,
        fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
