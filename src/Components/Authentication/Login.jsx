import { useContext, useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";


const Login = ({ openSignup }) => {
  const { login ,isAuthenticated} = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  if (isAuthenticated) {
  return <Navigate to="/dashboard" replace />;
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await login(email, password);

    setSubmitStatus(result);
    if (result.success) {
      setEmail("");
      setPassword("");
    }
    else {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus({ success: false, message: "" });
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
        {/* Form container */}
        <div className="p-8">
          {/* Minimalist header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-indigo-700 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {submitStatus.message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center animate-fadeIn ${
                submitStatus.success
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {submitStatus.success ? (
                <FiCheck className="mr-2 text-green-600 text-xl flex-shrink-0" />
              ) : (
                <FiX className="mr-2 text-red-600 text-xl flex-shrink-0" />
              )}
              <span>{submitStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="relative">
              <input
                type="email"
                className="w-full p-4 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all pl-12"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                autoFocus
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-500">
                <FiMail className="text-xl" />
              </div>
            </div>

            {/* Password field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-4 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all pl-12 pr-12"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-500">
                <FiLock className="text-xl" />
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Remember me & Forgot password */}
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div> */}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-4 rounded-xl font-semibold text-white shadow-md transition-all duration-300 ${
                isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging In...
                </div>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                onClick={(e)=>{
                    e.preventDefault();
                    openSignup()
                    
                    
                   
                }}
                className="font-medium text-indigo-600 hover:text-indigo-800"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;