import React, { useState } from "react";
import { NavLink } from "react-router";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineFundProjectionScreen,
  AiOutlinePhone,
  AiOutlineUserAdd,
  AiOutlineMail,
  AiOutlinePhone as AiOutlinePhoneIcon,
  AiOutlineEnvironment,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineYoutube,
  AiOutlineArrowUp,
  AiOutlineHeart
} from "react-icons/ai";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log("Subscribed with email:", email);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1 rounded-lg">
                <span className="text-white font-bold">Exam</span>
                <span className="text-orange-300 font-bold">Hero</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering students to excel in their academic journey with comprehensive 
              study materials, expert guidance, and innovative learning tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Facebook">
                <AiOutlineFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Twitter">
                <AiOutlineTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300" aria-label="Instagram">
                <AiOutlineInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="LinkedIn">
                <AiOutlineLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-300" aria-label="YouTube">
                <AiOutlineYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-blue-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <AiOutlineHome className="text-blue-400" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <AiOutlineInfoCircle className="text-blue-400" /> About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/programs" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <AiOutlineFundProjectionScreen className="text-blue-400" /> Programs
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/founder-journey" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <AiOutlineUserAdd className="text-blue-400" /> Founder Journey
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <AiOutlinePhone className="text-blue-400" /> Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/applyteacher" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <AiOutlineUserAdd className="text-blue-400" /> Teach With Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-blue-500">
              Our Programs
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="text-blue-300 text-sm font-medium mb-2">SSC Programs</h4>
                <ul className="space-y-2">
                  <li><NavLink to="/programs/ssc/science" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">SSC Science</NavLink></li>
                  <li><NavLink to="/programs/ssc/humanities" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">SSC Humanities</NavLink></li>
                  <li><NavLink to="/programs/ssc/business" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">SSC Business Studies</NavLink></li>
                </ul>
              </div>
              <div>
                <h4 className="text-blue-300 text-sm font-medium mb-2">HSC Programs</h4>
                <ul className="space-y-2">
                  <li><NavLink to="/programs/hsc/science" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">HSC Science</NavLink></li>
                  <li><NavLink to="/programs/hsc/humanities" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">HSC Humanities</NavLink></li>
                  <li><NavLink to="/programs/hsc/business" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">HSC Business Studies</NavLink></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-blue-500">
              Stay Updated
            </h3>
            
            <div className="mb-8">
              <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates and resources.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                <div className="relative">
                  <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium"
                >
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p className="text-green-400 mt-2 text-sm">Thank you for subscribing!</p>
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AiOutlineEnvironment className="text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">123 Education Street, Academic City, 10001</span>
                </li>
                <li className="flex items-start gap-3">
                  <AiOutlinePhoneIcon className="text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <AiOutlineMail className="text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">info@examhero.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} ExamHero. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <NavLink to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</NavLink>
            <NavLink to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</NavLink>
            <NavLink to="/cookies" className="hover:text-white transition-colors duration-300">Cookie Policy</NavLink>
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-6 pt-4 border-t border-gray-800">
          <p className="text-gray-500 text-sm flex items-center justify-center">
            Made with <AiOutlineHeart className="text-red-500 mx-1" /> for students worldwide
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40"
        aria-label="Scroll to top"
      >
        <AiOutlineArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;