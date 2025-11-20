import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate()
  const{isAuthenticated} = useContext(AuthContext)
  const handleClick = () => {
    isAuthenticated ? navigate("/dashboard") : navigate("/modal?mode=login")
  }
  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div className="pl-10 space-y-6">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
            New Season Arrivals
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Shop the Latest Trends at <br />
            <span className="text-green-600 playwrite-logo">Shopperz Stop</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Discover top-quality apparel, accessories and more — unmatched prices
            and fast delivery right to your doorstep.
          </p>

          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition"
          onClick={handleClick}>
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="src\assets\hero.png"
            alt="Shopperz Stop Products"
            className="w-full max-w-md lg:max-w-lg object-cover drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
