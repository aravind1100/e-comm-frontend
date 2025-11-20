import { useEffect, useRef } from "react";
import Signup from "./Signup";
import { FiX } from "react-icons/fi";
import Login from "./Login";
import { useNavigate, useSearchParams } from "react-router-dom";


const Modal = () => {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get the current mode (must be 'login' or 'signup') from the URL
  const currentMode = searchParams.get("mode");

  // Determine which form to show inside the modal
  const currentModal =
    currentMode === "signup"
      ? "signup"
      : currentMode === "login"
      ? "login"
      : null;

  // Unified close function: navigate back to the home route
  const handleClose = () => {
    navigate("/"); // Navigate away from /modal to close the modal
  };

  // Helper function to switch forms (login <-> signup)
  const openLogin = () => navigate("/modal?mode=login");
  const openSignup = () => navigate("/modal?mode=signup");


  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (currentModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [currentModal]); // Dependencies simplified

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (currentModal) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [currentModal]); // Dependencies simplified

  // Don't render if the URL doesn't have a valid mode
  if (!currentModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 animate-fadeIn"
      >
        <button
          onClick={handleClose} // Uses the route-closing function
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <FiX size={25} />
        </button>

        {/* Conditionally render the correct form */}
        {currentModal === "signup" && <Signup openLogin={openLogin} />}
        {currentModal === "login" && <Login openSignup={openSignup} />}
      </div>
    </div>
  );
};

export default Modal;