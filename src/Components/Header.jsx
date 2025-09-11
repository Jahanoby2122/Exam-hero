import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineFundProjectionScreen,
  AiOutlineQuestionCircle,
  AiOutlinePhone,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineClose
} from "react-icons/ai";
import { AuthContext } from "../Provider/AuthProvider";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        alert("Logout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 transition-all duration-300 relative group ${
      isActive 
        ? "text-blue-600 font-semibold" 
        : "text-gray-700 hover:text-blue-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg ${
      isActive 
        ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600" 
        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
    }`;

  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg py-0" : "shadow-md py-1"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost lg:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose className="h-6 w-6 text-gray-700" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Logo with animation */}
            <NavLink 
              to="/" 
              className="text-xl font-bold text-blue-700 flex items-center transition-transform hover:scale-105 duration-300"
            >
              <span className="text-2xl bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Exam</span>
              <span className="text-2xl text-orange-500">Hero</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-1 items-center">
              <li>
                <NavLink to="/" className={linkClass}>
                  <AiOutlineHome className="text-lg transition-transform group-hover:scale-110" /> 
                  <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={linkClass}>
                  <AiOutlineInfoCircle className="text-lg transition-transform group-hover:scale-110" /> 
                  <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">About</span>
                </NavLink>
              </li>

              {/* Programs Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                <button className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 group ${isProgramsOpen ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>
                  <AiOutlineFundProjectionScreen className="text-lg transition-transform group-hover:scale-110" /> 
                  <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">Programs</span>
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${isProgramsOpen ? "rotate-180" : ""}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Content with animation */}
                <div 
                  className={`absolute top-full left-0 transform mt-2 bg-white shadow-xl rounded-lg w-96 p-5 grid gap-6 z-50 overflow-hidden ${
                    isProgramsOpen 
                      ? "opacity-100 translate-y-0 transition-all duration-300 ease-out" 
                      : "opacity-0 -translate-y-2 pointer-events-none transition-all duration-200 ease-in"
                  }`}
                  style={{ boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  {/* SSC Programs */}
                  <div>
                    <h3 className="font-bold text-blue-700 border-b border-gray-200 pb-2 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">SSC</span>
                      Secondary School Certificate
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <NavLink to="/programs/ssc/science" className="block py-2 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:pl-4 text-gray-700 hover:text-blue-700">
                          SSC Science
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/programs/ssc/humanities" className="block py-2 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:pl-4 text-gray-700 hover:text-blue-700">
                          SSC Humanities
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/programs/ssc/business" className="block py-2 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:pl-4 text-gray-700 hover:text-blue-700">
                          SSC Business Studies
                        </NavLink>
                      </li>
                    </ul>
                  </div>

                  {/* HSC Programs */}
                  <div>
                    <h3 className="font-bold text-blue-700 border-b border-gray-200 pb-2 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">HSC</span>
                      Higher Secondary Certificate
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <NavLink to="/programs/hsc/science" className="block py-2 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:pl-4 text-gray-700 hover:text-blue-700">
                          HSC Science
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/programs/hsc/humanities" className="block py-2 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:pl-4 text-gray-700 hover:text-blue-700">
                          HSC Humanities
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/programs/hsc/business" className="block py-2 px-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:pl-4 text-gray-700 hover:text-blue-700">
                          HSC Business Studies
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li>
                <NavLink to="/founder-journey" className={linkClass}>
                  <AiOutlineUserAdd className="text-lg transition-transform group-hover:scale-110" /> 
                  <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">Founder Journey</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/faq" className={linkClass}>
                  <AiOutlineQuestionCircle className="text-lg transition-transform group-hover:scale-110" /> 
                  <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">FAQ</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/contact" className={linkClass}>
                  <AiOutlinePhone className="text-lg transition-transform group-hover:scale-110" /> 
                  <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">Contact</span>
                </NavLink>
                
              </li>
              <li>
                <NavLink to="/addteacher" className={linkClass}>
                  <AiOutlinePhone className="text-lg transition-transform group-hover:scale-110" /> 
                  <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">Add teacher</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right: Auth buttons */}
          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-primary hidden sm:inline-flex items-center gap-1 transition-all duration-300 hover:gap-2 hover:shadow-md"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className="btn btn-outline btn-primary hidden sm:inline-flex items-center gap-1 transition-all duration-300 hover:gap-2 hover:shadow-md"
                >
                  <AiOutlineLogin className="mr-1 transition-transform group-hover:scale-110" /> 
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="btn btn-primary hidden sm:inline-flex items-center gap-1 transition-all duration-300 hover:gap-2 hover:shadow-md"
                >
                  <AiOutlineUserAdd className="mr-1 transition-transform group-hover:scale-110" /> 
                  Register
                </NavLink>
              </>
            )}

            {/* Mobile buttons */}
            { !user && (
              <NavLink to="/login" className="btn btn-ghost btn-sm sm:hidden rounded-full p-2">
                <AiOutlineLogin className="text-lg" />
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu with slide animation */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out bg-white ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "64px" }}
      >
        <div className="h-full overflow-y-auto py-4 px-4">
          <ul className="menu space-y-1">
            <li>
              <NavLink to="/" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                <AiOutlineHome className="text-xl" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                <AiOutlineInfoCircle className="text-xl" /> About
              </NavLink>
            </li>
            <li>
              <div className="collapse collapse-arrow">
                <input type="checkbox" className="peer" />
                <div className="collapse-title flex items-center gap-3 px-4 py-3 text-gray-700 font-medium peer-checked:bg-blue-50 peer-checked:text-blue-600 rounded-lg">
                  <AiOutlineFundProjectionScreen className="text-xl" /> Programs
                </div>
                <div className="collapse-content pl-4"> 
                  <ul className="space-y-1 mt-2">
                    <li>
                      <NavLink to="/programs/ssc/science" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                        SSC Science
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/programs/ssc/humanities" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                        SSC Humanities
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/programs/ssc/business" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                        SSC Business Studies
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/programs/hsc/science" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                        HSC Science
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/programs/hsc/humanities" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                        HSC Humanities
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/programs/hsc/business" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                        HSC Business Studies
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <NavLink to="/founder-journey" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                <AiOutlineUserAdd className="text-xl" /> Founder Journey
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                <AiOutlineQuestionCircle className="text-xl" /> FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                <AiOutlinePhone className="text-xl" /> Contact
              </NavLink>
            </li>

            {/* Mobile Auth Buttons */}
            <li className="pt-4 mt-4 border-t border-gray-200">
              {user ? (
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="btn btn-outline btn-primary w-full justify-center mb-2"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink to="/login" className="btn btn-outline btn-primary w-full justify-center mb-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <AiOutlineLogin className="mr-2" /> Login
                  </NavLink>
                  <NavLink to="/register" className="btn btn-primary w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                    <AiOutlineUserAdd className="mr-2" /> Register
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
