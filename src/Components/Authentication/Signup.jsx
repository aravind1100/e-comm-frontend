import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
} from "react-icons/fi";

const Signup = ({ openLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Account created successfully!",
        });
        setUsername("");
        setEmail("");
        setPassword("");
        openLogin();
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || "Signup failed",
        });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        success: false,
        message: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);

      // Clear status message after 3 seconds

      setTimeout(() => {
        const isSucess = submitStatus.success;
        setSubmitStatus({ success: false, message: "" });
        if (isSucess) {
          openLogin();
        }
      }, 3000);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return Math.min(strength, 5);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
        {/* Form container */}
        <div className="p-8">
          {/* Minimalist header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-indigo-700 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Join our community today</p>
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
            {/* Username field */}
            <div className="relative">
              <input
                className={`w-full p-4 border-b-2 focus:border-indigo-500 focus:outline-none transition-all pl-12 ${
                  username.length > 0 && username.length < 5
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                minLength={5}
                maxLength={15}
                autoFocus
                required
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-500">
                <FiUser className="text-xl" />
              </div>
              {username.length > 0 && username.length < 5 && (
                <p className="text-orange-600 text-xs mt-2 ml-1">
                  Username must be at least 5 characters
                </p>
              )}
            </div>

            {/* Email field */}
            <div className="relative">
              <input
                type="email"
                className="w-full p-4 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all pl-12"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-500">
                <FiMail className="text-xl" />
              </div>
            </div>

            {/* Password field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full p-4 border-b-2 focus:outline-none transition-all pl-12 pr-12 ${
                  password.length > 0 && password.length < 6
                    ? "border-orange-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create your password"
                minLength={6}
                maxLength={15}
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

            {/* Password strength indicator */}
            {password.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-500 mr-2">
                    Password strength:
                  </span>
                  <div className="flex-1 flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full flex-1 transition-all ${
                          i < getPasswordStrength()
                            ? getPasswordStrength() <= 2
                              ? "bg-orange-500"
                              : getPasswordStrength() <= 4
                              ? "bg-blue-500"
                              : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {getPasswordStrength() <= 2 && "Weak - Add more characters"}
                  {getPasswordStrength() === 3 &&
                    "Medium - Add uppercase or numbers"}
                  {getPasswordStrength() === 4 && "Strong"}
                  {getPasswordStrength() >= 5 && "Very strong"}
                </p>
              </div>
            )}

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
                  Creating Account...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  openLogin();
                }}
                className="font-medium text-indigo-600 hover:text-indigo-800"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
