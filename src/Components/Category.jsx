import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api.js";


const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get("/categories"); // GET /api/categories
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categorySlug) => {
    try {
      const { data } = await API.get(`/products?category=${categorySlug}`); // fetch products by category
      navigate(`/category/${categorySlug}`);

    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <>
      {(categories || []).map((category) => (
        <div
          key={category._id}
          className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer hover:border-blue-500"
        >
          <div className="flex items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy" 
                onClick={() =>
                  handleCategoryClick(category.slug)
                }
              />
            </div>
            <div className="p-3 sm:p-4 flex-1">
              <h3
                className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-300"
                onClick={() =>
                  handleCategoryClick(category.slug)
                }
              >
                {category.name}
              </h3>
              <p
                className="text-xs sm:text-sm text-gray-600 mt-1"
                onClick={() =>
                  handleCategoryClick(category.slug)
                }
              >
                Shop now →
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Category;
