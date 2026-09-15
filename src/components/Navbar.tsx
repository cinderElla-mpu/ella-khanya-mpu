import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, SlidersHorizontal, ArrowUpRight, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data, openEditModal } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 72;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-cyan-600 transition-colors">
              EK
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-slate-900 tracking-tight text-lg group-hover:text-cyan-600 transition-colors">
                {data.personalInfo.name}
              </span>
              <span className="text-xs text-slate-600 font-medium hidden sm:inline-block">
                Application Creator
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-cyan-600 bg-cyan-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-edit-mode-btn"
              onClick={() => openEditModal('general')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-lg border border-cyan-200 transition-colors"
              title="Edit portfolio info, links, education, and uploads"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-600" />
              <span>Edit Portfolio</span>
            </button>

            <a
              id="nav-view-work-btn"
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl shadow-xs transition-all transform active:scale-95"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              id="nav-contact-btn"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-500" />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openEditModal('general')}
              className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg border border-cyan-200"
              title="Edit Portfolio"
              aria-label="Edit Portfolio"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? 'text-cyan-600 bg-cyan-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="w-full text-center py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm shadow-xs"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
