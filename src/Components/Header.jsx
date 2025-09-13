import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink } from "react-router";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineFundProjectionScreen,
  AiOutlineQuestionCircle,
  AiOutlinePhone,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineBook,
  AiOutlineTeam,
  AiOutlineRocket
} from "react-icons/ai";
import { AuthContext } from "../Provider/AuthProvider";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);

  const { user, logOut } = useContext(AuthContext);
  const programsRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Logout successfully");
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (programsRef.current && !programsRef.current.contains(event.target)) {
        setIsProgramsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 transition-all duration-300 relative group ${
      isActive 
        ? "text-blue-600 font-semibold after:absolute after:left-3 after:right-3 after:-bottom-2 after:h-0.5 after:bg-blue-600" 
        : "text-gray-700 hover:text-blue-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg ${
      isActive 
        ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600" 
        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
    }`;

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  const toggleMobileSubmenu = (menu) => {
    setActiveMobileSubmenu(activeMobileSubmenu === menu ? null : menu);
  };

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
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose className="h-6 w-6 text-gray-700" />
              ) : (
                <AiOutlineMenu className="h-6 w-6 text-gray-700" />
              )}
            </button>

            {/* Logo with animation */}
            <NavLink 
              to="/" 
              className="text-xl font-bold text-blue-700 flex items-center transition-transform hover:scale-105 duration-300"
              aria-label="ExamHero Home"
            >
              <div className="flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1 rounded-lg">
                <AiOutlineBook className="mr-2 text-white" />
                <span className="text-white">Exam</span>
                <span className="text-orange-300">Hero</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-1 items-center">
              <li>
                <NavLink to="/" className={linkClass}>
                  <AiOutlineHome className="text-lg transition-transform group-hover:scale-110" /> 
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={linkClass}>
                  <AiOutlineInfoCircle className="text-lg transition-transform group-hover:scale-110" /> 
                  <span>About</span>
                </NavLink>
              </li>

              {/* Programs Dropdown */}
              <li
                className="relative"
                ref={programsRef}
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                <button 
                  className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 group ${isProgramsOpen ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                  aria-expanded={isProgramsOpen}
                  aria-haspopup="true"
                >
                  <AiOutlineFundProjectionScreen className="text-lg transition-transform group-hover:scale-110" /> 
                  <span>Programs</span>
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${isProgramsOpen ? "rotate-180" : ""}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Content */}
                <div 
                  className={`absolute top-full left-0 transform mt-2 bg-white shadow-xl rounded-lg w-96 p-5 grid grid-cols-2 gap-6 z-50 overflow-hidden ${
                    isProgramsOpen 
                      ? "opacity-100 translate-y-0 transition-all duration-300 ease-out" 
                      : "opacity-0 -translate-y-2 pointer-events-none transition-all duration-200 ease-in"
                  }`}
                  style={{ boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)" }}
                  role="menu"
                >
                  {/* SSC Programs */}
                  <div>
                    <h3 className="font-bold text-blue-700 border-b border-gray-200 pb-2 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">SSC</span>
                      Secondary School Certificate
                    </h3>
                    <ul className="space-y-2">
                      <li><NavLink to="/programs/ssc/science" className="block py-2 px-3 rounded-lg hover:bg-blue-50 hover:pl-4 transition-all duration-200 flex items-center gap-2" role="menuitem"><AiOutlineRocket className="text-blue-500" /> SSC Science</NavLink></li>
                      <li><NavLink to="/programs/ssc/humanities" className="block py-2 px-3 rounded-lg hover:bg-blue-50 hover:pl-4 transition-all duration-200 flex items-center gap-2" role="menuitem"><AiOutlineRocket className="text-blue-500" /> SSC Humanities</NavLink></li>
                      <li><NavLink to="/programs/ssc/business" className="block py-2 px-3 rounded-lg hover:bg-blue-50 hover:pl-4 transition-all duration-200 flex items-center gap-2" role="menuitem"><AiOutlineRocket className="text-blue-500" /> SSC Business Studies</NavLink></li>
                    </ul>
                  </div>

                  {/* HSC Programs */}
                  <div>
                    <h3 className="font-bold text-blue-700 border-b border-gray-200 pb-2 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">HSC</span>
                      Higher Secondary Certificate
                    </h3>
                    <ul className="space-y-2">
                      <li><NavLink to="/programs/hsc/science" className="block py-2 px-3 rounded-lg hover:bg-blue-50 hover:pl-4 transition-all duration-200 flex items-center gap-2" role="menuitem"><AiOutlineRocket className="text-blue-500" /> HSC Science</NavLink></li>
                      <li><NavLink to="/programs/hsc/humanities" className="block py-2 px-3 rounded-lg hover:bg-blue-50 hover:pl-4 transition-all duration-200 flex items-center gap-2" role="menuitem"><AiOutlineRocket className="text-blue-500" /> HSC Humanities</NavLink></li>
                      <li><NavLink to="/programs/hsc/business" className="block py-2 px-3 rounded-lg hover:bg-blue-50 hover:pl-4 transition-all duration-200 flex items-center gap-2" role="menuitem"><AiOutlineRocket className="text-blue-500" /> HSC Business Studies</NavLink></li>
                    </ul>
                  </div>
                </div>
              </li>

              <li><NavLink to="/founder-journey" className={linkClass}><AiOutlineUserAdd className="text-lg" /> Founder Journey</NavLink></li>
              <li><NavLink to="/contact" className={linkClass}><AiOutlinePhone className="text-lg" /> Contact</NavLink></li>
              <li><NavLink to="/applyteacher" className={linkClass}><AiOutlineTeam className="text-lg" /> Teach With Us</NavLink></li>
            </ul>
          </nav>

          {/* Right: Auth buttons + User Avatar */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="profile-dropdown relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="User profile"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500 shadow-sm overflow-hidden bg-blue-100 flex items-center justify-center">
                    {imageError || !user.photoURL ? (
                      <span className="text-blue-600 font-semibold text-lg">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                      </span>
                    ) : (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.displayName || "User"}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <NavLink 
                      to="/dashboard" 
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                      role="menuitem"
                    >
                      <AiOutlineDashboard className="text-lg" /> Dashboard
                    </NavLink>
                    <NavLink 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                      role="menuitem"
                    >
                      <AiOutlineUser className="text-lg" /> Profile
                    </NavLink>
                    <button
                      onClick={() => { handleLogout(); setIsProfileOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left"
                      role="menuitem"
                    >
                      <AiOutlineLogout className="text-lg" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline btn-primary hidden sm:inline-flex items-center gap-1 transition-transform hover:scale-105"> <AiOutlineLogin /> Login </NavLink>
                <NavLink to="/register" className="btn btn-primary hidden sm:inline-flex items-center gap-1 transition-transform hover:scale-105 ml-2"> <AiOutlineUserAdd /> Register </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`lg:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out bg-white mobile-menu-container ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "64px" }}
      >
        <div className="h-full overflow-y-auto py-4 px-4">
          <ul className="menu space-y-1">
            <li><NavLink to="/" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}><AiOutlineHome className="text-xl" /> Home</NavLink></li>
            <li><NavLink to="/about" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}><AiOutlineInfoCircle className="text-xl" /> About</NavLink></li>
            
            {/* Programs Mobile Submenu */}
            <li>
              <div className={`rounded-lg ${activeMobileSubmenu === 'programs' ? 'bg-blue-50' : ''}`}>
                <button 
                  onClick={() => toggleMobileSubmenu('programs')}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <AiOutlineFundProjectionScreen className="text-xl" /> 
                    <span>Programs</span>
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${activeMobileSubmenu === 'programs' ? "rotate-180" : ""}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeMobileSubmenu === 'programs' && (
                  <div className="pl-12 mt-1 space-y-1 animate-slideDown">
                    <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide pl-3 py-1">SSC Programs</div>
                    <NavLink to="/programs/ssc/science" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>SSC Science</NavLink>
                    <NavLink to="/programs/ssc/humanities" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>SSC Humanities</NavLink>
                    <NavLink to="/programs/ssc/business" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>SSC Business Studies</NavLink>
                    
                    <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide pl-3 py-1 mt-2">HSC Programs</div>
                    <NavLink to="/programs/hsc/science" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>HSC Science</NavLink>
                    <NavLink to="/programs/hsc/humanities" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>HSC Humanities</NavLink>
                    <NavLink to="/programs/hsc/business" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>HSC Business Studies</NavLink>
                  </div>
                )}
              </div>
            </li>

            <li><NavLink to="/founder-journey" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}><AiOutlineUserAdd className="text-xl" /> Founder Journey</NavLink></li>
            <li><NavLink to="/contact" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}><AiOutlinePhone className="text-xl" /> Contact</NavLink></li>
            <li><NavLink to="/applyteacher" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}><AiOutlineTeam className="text-xl" /> Teach With Us</NavLink></li>
            
            {user && (
              <li><NavLink to="/dashboard" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}><AiOutlineDashboard className="text-xl" /> Dashboard</NavLink></li>
            )}

            {/* Auth + User Info */}
            <li className="pt-4 mt-4 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-blue-500 shadow-md overflow-hidden bg-blue-100 flex items-center justify-center">
                    {imageError || !user.photoURL ? (
                      <span className="text-blue-600 font-semibold text-xl">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                      </span>
                    ) : (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    )}
                  </div>
                  {user.displayName && (
                    <span className="text-gray-700 font-semibold text-center px-2 truncate max-w-full">{user.displayName}</span>
                  )}
                  <NavLink to="/profile" className="btn btn-outline btn-primary w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <AiOutlineUser className="mr-2" /> Profile
                  </NavLink>
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="btn btn-outline btn-primary w-full"
                  >
                    <AiOutlineLogout className="mr-2" /> Logout
                  </button>
                </div>
              ) : (
                <>
                  <NavLink to="/login" className="btn btn-outline btn-primary w-full mb-2 flex items-center justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                    <AiOutlineLogin className="mr-2" /> Login
                  </NavLink>
                  <NavLink to="/register" className="btn btn-primary w-full flex items-center justify-center" onClick={() => setIsMobileMenuOpen(false)}>
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