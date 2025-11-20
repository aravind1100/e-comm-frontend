import Category from "../Category";

const CategoryPage = () => {
  return (
    <div className=" w-full bg-gray-50">

      {/* Header Section */}
      <div className="w-full  py-10 shadow-md">
        <h1 className="text-3xl font-extrabold text-green-500 text-center drop-shadow-md tracking-wide">
          Shop by Categories
        </h1>
        <p className="text-center font-medium mt-2 text-sm">
          Explore products from all collections
        </p>

        {/* Decorative underline */}
        <div className="h-1 w-20 bg-white mx-auto rounded-full mt-3"></div>
      </div>

      {/* Category Grid Section */}
      <div className="max-w-8xl mx-auto p-4 sm:p-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <Category />
        </div>

      </div>

    </div>
  );
};

export default CategoryPage;
