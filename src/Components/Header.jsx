import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router"; // Use react-router-dom
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineFundProjectionScreen,
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
  AiOutlineRocket,
  AiOutlineCaretDown, // Using a more common dropdown icon
} from "react-icons/ai";
import { AuthContext } from "../Provider/AuthProvider";

const Header = () => {
  const [menuState, setMenuState] = useState({
    isMobileMenuOpen: false,
    isProgramsOpen: false,
    isProfileOpen: false,
    activeMobileSubmenu: null,
  });

  const [scrolled, setScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { user, logOut } = useContext(AuthContext);
  const programsRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMenuState = (key) => {
    setMenuState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      // Close other menus when one is opened
      ...(key === "isProfileOpen" && { isProgramsOpen: false }),
      ...(key === "isProgramsOpen" && { isProfileOpen: false }),
      ...(key === "isMobileMenuOpen" && { activeMobileSubmenu: null }),
    }));
  };

  const closeAllMenus = () => {
    setMenuState({
      isMobileMenuOpen: false,
      isProgramsOpen: false,
      isProfileOpen: false,
      activeMobileSubmenu: null,
    });
  };

  const toggleMobileSubmenu = (menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      activeMobileSubmenu: prevState.activeMobileSubmenu === menu ? null : menu,
    }));
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        programsRef.current &&
        !programsRef.current.contains(event.target)
      ) {
        setMenuState((prev) => ({ ...prev, isProgramsOpen: false }));
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setMenuState((prev) => ({ ...prev, isProfileOpen: false }));
      }
      if (
        menuState.isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target)
      ) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuState.isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuState.isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [menuState.isMobileMenuOpen]);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 transition-all duration-300 relative font-medium ${
      isActive
        ? "text-blue-600 after:absolute after:left-3 after:right-3 after:-bottom-2 after:h-0.5 after:bg-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-lg ${
      isActive
        ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600"
        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
    }`;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <header
      className={`bg-white z-50 sticky top-0 transition-all duration-300 ${
        scrolled ? "shadow-lg py-1" : "shadow-md py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              ref={mobileMenuButtonRef}
              onClick={() => toggleMenuState("isMobileMenuOpen")}
              className="lg:hidden text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-md p-2"
              aria-label="Toggle main menu"
              aria-expanded={menuState.isMobileMenuOpen}
            >
              {menuState.isMobileMenuOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
            <NavLink
              to="/"
              className="text-2xl font-extrabold text-blue-700 flex items-center ml-4 md:ml-0"
            >
              <AiOutlineBook className="mr-2 text-blue-600" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                Exam
              </span>
              <span className="text-orange-400">Hero</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-6 items-center">
              <li>
                <NavLink to="/" className={linkClass}>
                  <AiOutlineHome className="text-lg" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={linkClass}>
                  <AiOutlineInfoCircle className="text-lg" />
                  About
                </NavLink>
              </li>
              <li
                className="relative"
                ref={programsRef}
                onMouseEnter={() =>
                  setMenuState((prev) => ({ ...prev, isProgramsOpen: true }))
                }
                onMouseLeave={() =>
                  setMenuState((prev) => ({ ...prev, isProgramsOpen: false }))
                }
              >
                <button
                  className={`flex items-center gap-2 font-medium px-3 py-2 transition-all duration-300 group ${
                    menuState.isProgramsOpen
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  aria-expanded={menuState.isProgramsOpen}
                  aria-haspopup="true"
                >
                  <AiOutlineFundProjectionScreen className="text-lg" />
                  <span>Programs</span>
                  <AiOutlineCaretDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      menuState.isProgramsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 transform mt-2 bg-white shadow-xl rounded-xl w-[400px] p-6 grid grid-cols-2 gap-6 z-50 transition-all duration-300 ${
                    menuState.isProgramsOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-blue-700 border-b border-gray-200 pb-2 mb-3">
                      SSC Programs
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <NavLink
                          to="/programs/ssc/science"
                          className="block p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          SSC Science
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/programs/ssc/humanities"
                          className="block p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          SSC Humanities
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/programs/ssc/business"
                          className="block p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          SSC Business Studies
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-700 border-b border-gray-200 pb-2 mb-3">
                      HSC Programs
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <NavLink
                          to="/programs/hsc/science"
                          className="block p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          HSC Science
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/programs/hsc/humanities"
                          className="block p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          HSC Humanities
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/programs/hsc/business"
                          className="block p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          HSC Business Studies
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <NavLink to="/allteachers" className={linkClass}>
                  <AiOutlineUserAdd className="text-lg" />
                  Teachers
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={linkClass}>
                  <AiOutlinePhone className="text-lg" />
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/applyteacher" className={linkClass}>
                  <AiOutlineTeam className="text-lg" />
                  Teach With Us
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* User/Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <div
                className="relative"
                ref={profileRef}
                onMouseEnter={() =>
                  setMenuState((prev) => ({ ...prev, isProfileOpen: true }))
                }
                onMouseLeave={() =>
                  setMenuState((prev) => ({ ...prev, isProfileOpen: false }))
                }
              >
                <button
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="User profile menu"
                  aria-expanded={menuState.isProfileOpen}
                  aria-haspopup="true"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden flex items-center justify-center bg-gray-100">
                    {imageError || !user.photoURL ? (
                      <span className="text-blue-600 font-semibold text-lg">
                        {user.displayName?.charAt(0).toUpperCase() || "U"}
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
                  <AiOutlineCaretDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      menuState.isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 transition-all duration-300 ${
                    menuState.isProfileOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => closeAllMenus()}
                  >
                    <AiOutlineDashboard className="text-lg" /> Dashboard
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => closeAllMenus()}
                  >
                    <AiOutlineUser className="text-lg" /> Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeAllMenus();
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left border-t border-gray-100 mt-2 pt-2"
                  >
                    <AiOutlineLogout className="text-lg" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <NavLink
                  to="/login"
                  className="btn btn-outline btn-primary hidden sm:inline-flex items-center transition-all duration-300 hover:bg-blue-600 hover:text-white"
                >
                  <AiOutlineLogin className="mr-1" /> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-primary hidden sm:inline-flex items-center transition-all duration-300 hover:bg-blue-700"
                >
                  <AiOutlineUserAdd className="mr-1" /> Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          menuState.isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeAllMenus}
      />

      {/* Mobile Menu Sidebar */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
          menuState.isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="py-4 px-4 h-full flex flex-col">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <NavLink
              to="/"
              className="text-2xl font-extrabold text-blue-700 flex items-center"
              onClick={closeAllMenus}
            >
              <AiOutlineBook className="mr-2 text-blue-600" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                Exam
              </span>
              <span className="text-orange-400">Hero</span>
            </NavLink>
            <button
              onClick={closeAllMenus}
              className="p-2 text-gray-700 rounded-md hover:bg-gray-100"
              aria-label="Close menu"
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mt-4">
            <ul className="menu space-y-1">
              <li>
                <NavLink to="/" className={mobileLinkClass} onClick={closeAllMenus}>
                  <AiOutlineHome className="text-xl" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={mobileLinkClass} onClick={closeAllMenus}>
                  <AiOutlineInfoCircle className="text-xl" /> About
                </NavLink>
              </li>
              <li>
                <div
                  className={`rounded-lg ${menuState.activeMobileSubmenu === "programs" ? "bg-blue-50" : ""}`}
                >
                  <button
                    onClick={() => toggleMobileSubmenu("programs")}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <AiOutlineFundProjectionScreen className="text-xl" />
                      <span>Programs</span>
                    </div>
                    <AiOutlineCaretDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        menuState.activeMobileSubmenu === "programs" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-max-h duration-300 ease-in-out ${
                      menuState.activeMobileSubmenu === "programs"
                        ? "max-h-96"
                        : "max-h-0"
                    }`}
                  >
                    <div className="pl-6 py-2 space-y-1">
                      <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide pl-3 py-1">
                        SSC Programs
                      </div>
                      <NavLink
                        to="/programs/ssc/science"
                        className={mobileLinkClass}
                        onClick={closeAllMenus}
                      >
                        SSC Science
                      </NavLink>
                      <NavLink
                        to="/programs/ssc/humanities"
                        className={mobileLinkClass}
                        onClick={closeAllMenus}
                      >
                        SSC Humanities
                      </NavLink>
                      <NavLink
                        to="/programs/ssc/business"
                        className={mobileLinkClass}
                        onClick={closeAllMenus}
                      >
                        SSC Business Studies
                      </NavLink>

                      <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide pl-3 py-1 mt-2">
                        HSC Programs
                      </div>
                      <NavLink
                        to="/programs/hsc/science"
                        className={mobileLinkClass}
                        onClick={closeAllMenus}
                      >
                        HSC Science
                      </NavLink>
                      <NavLink
                        to="/programs/hsc/humanities"
                        className={mobileLinkClass}
                        onClick={closeAllMenus}
                      >
                        HSC Humanities
                      </NavLink>
                      <NavLink
                        to="/programs/hsc/business"
                        className={mobileLinkClass}
                        onClick={closeAllMenus}
                      >
                        HSC Business Studies
                      </NavLink>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <NavLink to="/allteachers" className={mobileLinkClass} onClick={closeAllMenus}>
                  <AiOutlineTeam className="text-xl" /> Teachers
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={mobileLinkClass} onClick={closeAllMenus}>
                  <AiOutlinePhone className="text-xl" /> Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/applyteacher" className={mobileLinkClass} onClick={closeAllMenus}>
                  <AiOutlineTeam className="text-xl" /> Teach With Us
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/dashboard" className={mobileLinkClass} onClick={closeAllMenus}>
                    <AiOutlineDashboard className="text-xl" /> Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          {/* Mobile Auth/User Section */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            {user ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden flex items-center justify-center bg-gray-100">
                  {imageError || !user.photoURL ? (
                    <span className="text-blue-600 font-semibold text-2xl">
                      {user.displayName?.charAt(0).toUpperCase() || "U"}
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
                <div className="text-center">
                  <p className="font-semibold text-gray-900 truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
                <NavLink
                  to="/profile"
                  className="btn btn-outline btn-primary w-full"
                  onClick={closeAllMenus}
                >
                  <AiOutlineUser className="mr-2" /> Profile
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    closeAllMenus();
                  }}
                  className="btn btn-primary w-full"
                >
                  <AiOutlineLogout className="mr-2" /> Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <NavLink
                  to="/login"
                  className="btn btn-outline btn-primary w-full"
                  onClick={closeAllMenus}
                >
                  <AiOutlineLogin className="mr-2" /> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-primary w-full"
                  onClick={closeAllMenus}
                >
                  <AiOutlineUserAdd className="mr-2" /> Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;