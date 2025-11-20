
const Promotion = () => {
  
  return (
    <div className="w-full px-4">
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl my-4 p-6">
        
        <div className="flex flex-col-reverse md:flex-row items-center md:items-center justify-between gap-6">
          
          {/* TEXT */}
          <div className="text-white text-center md:text-left flex-1">
            
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                DAMAKA DEALS
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                50% OFF ON ALL SHOES
              </h2>
            </div>

            <p className="text-purple-200 text-sm sm:text-base mb-4">
              Don't miss this amazing offer on this collection.
              Stay Tuned!
            </p>

            <button className="bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition shadow-lg hover:shadow-xl hover:scale-105">
              Arriving Soon
            </button>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=400&q=60"
              alt="Shoe Promotion"
              className="h-28 w-40 sm:h-32 md:h-36 object-cover rounded-lg shadow-xl hover:scale-105 transition-transform"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Promotion;
