import React, { useState } from 'react';
import { VTGLogo } from '../common/VTGLogo';
import { useApp, PublicPage } from '../../context/AppContext';
import { Briefcase, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { publicPage, setPublicPage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PublicPage }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'SOLUTIONS', page: 'solutions' },
    { label: 'ABOUT', page: 'about' },
    { label: 'BLOG', page: 'blog' },
    { label: 'CONTACT', page: 'contact' },
  ];

  const handleNavClick = (page: PublicPage) => {
    setPublicPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Floating Pill Capsule Header */}
      <header
        id="main-header"
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none transition-all"
      >
        <div className="max-w-6xl mx-auto">
          {/* Main Floating White Capsule */}
          <div
            id="nav-capsule"
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-full shadow-lg shadow-slate-900/5 border border-slate-100/90 px-3 sm:px-6 py-1.5 sm:py-2.5 flex items-center justify-between transition-all"
          >
            {/* Left: Authentic Brand Logo */}
            <div className="flex items-center flex-shrink-0">
              <VTGLogo
                size="sm"
                onClick={() => handleNavClick('home')}
                className="cursor-pointer"
              />
            </div>

            {/* Middle: Desktop Nav Links with active red indicator */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
              {navLinks.map((link) => {
                const isActive = publicPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`relative py-1 text-xs xl:text-sm tracking-wider font-bold transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? 'text-[#8B151E]'
                        : 'text-slate-700 hover:text-[#8B151E]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#8B151E] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: CTA Suitcase Button */}
            <div className="hidden lg:flex items-center">
              <button
                id="nav-apply-now-btn"
                onClick={() => handleNavClick('apply')}
                className="flex items-center gap-2 px-5 py-2 text-xs xl:text-sm font-bold text-white bg-[#8B151E] hover:bg-[#720E15] active:scale-95 rounded-full transition-all duration-150 shadow-md shadow-red-950/20 whitespace-nowrap cursor-pointer group"
              >
                <Briefcase className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">APPLY NOW</span>
              </button>
            </div>

            {/* Mobile Action Controls: Compact CTA Button + Hamburger Menu */}
            <div className="flex items-center gap-1.5 lg:hidden flex-shrink-0">
              {/* Compact CTA Suitcase Button (No right arrow) */}
              <button
                id="mobile-nav-apply-btn"
                onClick={() => handleNavClick('apply')}
                className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-white bg-[#8B151E] hover:bg-[#720E15] active:scale-95 rounded-full shadow-xs cursor-pointer whitespace-nowrap"
              >
                <Briefcase className="w-3 h-3 text-white flex-shrink-0" />
                <span>Apply Now</span>
              </button>

              {/* Minimalist Hamburger / Close Button */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-4.5 h-4.5 text-slate-900 stroke-[2.2]" />
                ) : (
                  <Menu className="w-4.5 h-4.5 text-slate-900 stroke-[2.2]" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Floating Card */}
          {mobileMenuOpen && (
            <div
              id="mobile-menu-card"
              className="pointer-events-auto mt-2.5 sm:mt-3 bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100/90 animate-in fade-in slide-in-from-top-3 duration-200"
            >
              {/* Vertical Navigation Links */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = publicPage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => handleNavClick(link.page)}
                      className={`text-left text-base sm:text-lg py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[#8B151E] font-extrabold bg-red-50/70'
                          : 'text-slate-800 font-bold hover:text-[#8B151E] hover:bg-slate-50'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
