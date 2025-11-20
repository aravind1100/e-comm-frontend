import { useState } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = ({aboutRef}) => {
    const [email, setEmail] = useState("");
    
    const handleClick = () => {
        if (!email) {
            alert("Please enter your email address");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address");
            return;
        }
        alert("Congrats, You have signed up for the Newsletter!");
        setEmail(""); // Clear email after successful signup
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <footer className="bg-gray-100 border-t border-gray-200 mt-10 w-full" ref={aboutRef}>
            <div className="flex flex-col p-8 mx-auto max-w-6xl">
                
                {/* Newsletter Signup Section */}
                <div className="flex flex-col md:flex-row md:justify-evenly md:items-center mb-12">
                    <h2 className="text-3xl md:text-4xl mb-6 md:mb-0 leading-tight">
                        Sign up to News<br />
                        <span className="text-2xl md:text-3xl">& Offers</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyUp={handleKeyPress}
                            placeholder="Enter your email"
                            className="w-full sm:w-80 border border-amber-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        />
                        <button 
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105"
                            onClick={handleClick}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Sign up
                        </button>
                    </div>
                </div>

                {/* Social Media & Links Section */}
                <div className="flex flex-col md:flex-row justify-evenly items-start md:items-center mb-8">
                    
                    {/* Social Media Section */}
                    <div className="mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Follow us on
                        </h3>
                        <div className="flex space-x-6">
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:text-pink-800 transition-all duration-200 hover:scale-110 transform hover:rotate-12"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={28} />
                            </a>
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-all duration-200 hover:scale-110 transform hover:rotate-12"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={28} />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-600 transition-all duration-200 hover:scale-110 transform hover:rotate-12"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={28} />
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-900 transition-all duration-200 hover:scale-110 transform hover:rotate-12"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={28} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Quick Links
                        </h4>
                        <a href="/about" className="text-gray-600 hover:text-amber-600 transition-colors duration-200 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            About Us
                        </a>
                        <a href="/faq" className="text-gray-600 hover:text-amber-600 transition-colors duration-200 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            FAQ
                        </a>
                        <a href="/terms" className="text-gray-600 hover:text-amber-600 transition-colors duration-200 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Terms & Conditions
                        </a>
                        <a href="/privacy" className="text-gray-600 hover:text-amber-600 transition-colors duration-200 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Privacy Policy
                        </a>
                        <a href="/contact" className="text-gray-600 hover:text-amber-600 transition-colors duration-200 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Contact Us
                        </a>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="flex justify-center items-center pt-6 border-t border-gray-300">
                    <p className="text-gray-600 text-sm text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        © 2025 E-com Company
                        <span className="text-gray-500 text-xs ml-2">All rights reserved</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
