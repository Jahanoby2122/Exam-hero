import React from "react";
import { NavLink } from "react-router";
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineYoutube,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineHeart,
  AiOutlineArrowUp
} from "react-icons/ai";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1 rounded-lg">
                <span className="text-white">Exam</span>
                <span className="text-orange-300">Hero</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              ExamHero is your premier platform for academic excellence. We provide comprehensive 
              educational resources and expert guidance to help students excel in their SSC and HSC examinations.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61580635798139" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <AiOutlineFacebook className="text-xl" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <AiOutlineTwitter className="text-xl" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <AiOutlineInstagram className="text-xl" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <AiOutlineLinkedin className="text-xl" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                aria-label="YouTube"
              >
                <AiOutlineYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-blue-500">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/sscscience" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  SSC Science
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/hscscience" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  HSC Science
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/allteachers" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  Our Teachers
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-blue-500">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <AiOutlineEnvironment className="text-blue-400 text-xl mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  Holding #439, Jankikhila, Sreebordi, Sherpur<br />
                  Mymensingh, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <AiOutlinePhone className="text-blue-400 text-xl mr-3 flex-shrink-0" />
                <a 
                  href="tel:+8801843716854" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  +88 01843716854
                </a>
              </li>
              <li className="flex items-center">
                <AiOutlineMail className="text-blue-400 text-xl mr-3 flex-shrink-0" />
                <a 
                  href="mailto:support@examhero.app" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  support@examhero.app
                </a>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-200">Subscribe to our Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            <p className="flex items-center">
              © {new Date().getFullYear()} ExamHero. All rights reserved. 
              Made with <AiOutlineHeart className="text-red-500 mx-1" /> by ExamHero Team.
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <NavLink to="/privicrpolicy" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Privacy Policy
            </NavLink>
            <NavLink to="/termsandconditions" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Terms of condtions
            </NavLink>
            <button 
              onClick={scrollToTop}
              className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="Scroll to top"
            >
              Back to Top
              <AiOutlineArrowUp className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
