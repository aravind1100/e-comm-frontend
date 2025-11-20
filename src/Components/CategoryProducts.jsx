import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import API from "../utils/api";

const CategoryProducts = () => {
  const { slug } = useParams();
  const { searchTerm } = useContext(SearchContext);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/products?category=${slug}`);
        setCategoryProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching category products:", err);
        setCategoryProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  // Apply search filtering on category products
  const filteredProducts = searchTerm
    ? categoryProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.category?.name &&
            p.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : categoryProducts;

  return (
    <div className="w-full max-w-8xl p-4 sm:p-6 bg-gray-50 mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
        {slug ? slug.replace("-", " ").toUpperCase() : "CATEGORY"}
      </h1>

      <div className="
        grid 
        grid-cols-1
        sm:grid-cols-2 
        md:grid-cols-3 
        xl:grid-cols-4 
        gap-4 sm:gap-5 md:gap-6 xl:gap-8
      ">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))
        ) : (
          <p className="text-center col-span-full mt-10">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
