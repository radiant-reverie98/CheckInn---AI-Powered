import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'; // 1. Import Clerk's useUser hook

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. Extract auth state and user details from Clerk
  const { isSignedIn, user, isLoaded } = useUser();

  // Handle scroll effect for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hotels', href: '#' },
    { name: 'Destinations', href: '#' },
    { name: 'Trips', href: '#' },
    { name: 'AI Planner', href: '#' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out h-[72px] flex flex-col justify-center ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]'
            : 'bg-white border-b border-[#E2E8F0]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-full">
            
            {/* Left Section: Logo & Brand */}
            <div className="flex items-center cursor-pointer">
              {/* Geometric Hotel/Travel Icon */}
              <svg 
                className="w-8 h-8 text-[#007ACC] mr-2.5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 21h18"></path>
                <path d="M5 21V7l8-4v18"></path>
                <path d="M13 3l8 4v14"></path>
                <path d="M9 11v4"></path>
                <path d="M17 11v4"></path>
              </svg>
              <span className="text-[#0F172A] font-bold text-xl tracking-tight">
                CheckInn
              </span>
            </div>

            {/* Center Section: Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[15px] font-medium text-[#0F172A]/80 hover:text-[#007ACC] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Section: Auth Buttons / Welcome Message */}
            <div className="hidden md:flex items-center space-x-4">
              {/* 3. Conditional Rendering for Desktop using Clerk's state */}
              {isLoaded && isSignedIn && user ? (
                <span className="text-[15px] font-medium text-[#0F172A]">
                  Welcome, <span className="font-semibold text-[#007ACC]">{user.firstName}</span>
                </span>
              ) : (
                <>
                  <Link to="/login" className="text-[15px] font-medium text-[#0F172A] hover:text-[#007ACC] px-3 py-2 transition-colors duration-200">
                    Start Booking
                  </Link>
                  <Link to="/register" className="bg-[#007ACC] hover:bg-[#005A9E] text-white text-[15px] font-medium px-5 py-2.5 rounded-lg transition-colors duration-200 shadow-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#0F172A] hover:text-[#007ACC] focus:outline-none p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-[72px] left-0 w-full bg-white border-b border-[#E2E8F0] z-40 transform transition-transform duration-300 ease-in-out md:hidden shadow-lg ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-[150%]'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-4 text-base font-medium text-[#0F172A] border-b border-[#E2E8F0]/50 hover:bg-gray-50 hover:text-[#007ACC] transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="pt-6 flex flex-col space-y-3 px-3">
            {/* 4. Conditional Rendering for Mobile using Clerk's state */}
            {isLoaded && isSignedIn && user ? (
              <div className="w-full py-3 text-center text-[15px] font-medium text-[#0F172A] bg-gray-50 border border-[#E2E8F0] rounded-lg">
                Welcome, <span className="font-semibold text-[#007ACC]">{user.firstName}</span>
              </div>
            ) : (
              <>
                <Link to="/login" className="w-full py-3 text-center text-[15px] font-medium text-[#0F172A] border border-[#E2E8F0] rounded-lg hover:bg-gray-50 transition-colors">
                  Start Booking
                </Link>
                <Link to="/register" className="w-full py-3 text-center bg-[#007ACC] hover:bg-[#005A9E] text-white text-[15px] font-medium rounded-lg transition-colors shadow-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;