import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, SlidersHorizontal, ArrowUpRight, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
          ? 'bg-white/90 backdrop-blur-xl shadow-md shadow-cyan-900/5 border-b border-cyan-100'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100'
      }`}
    >
      {/* Top Vibrant Color Strip */}
      <div className="h-1 bg-gradient-to-r from-cyan-400 via-teal-400 via-sky-400 to-cyan-500 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                {data.profilePicture?.dataUrl ? (
                  <motion.div
                    key="nav-photo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-11 h-11 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform ring-2 ring-cyan-300"
                  >
                    <img
                      src={data.profilePicture.dataUrl}
                      alt={data.personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="nav-mono"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform ring-2 ring-cyan-200"
                  >
                    EK
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Online pulse indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white" title="Active Explorer & Builder" />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-extrabold text-slate-900 tracking-tight text-lg group-hover:text-cyan-600 transition-colors flex items-center gap-1.5">
                {data.personalInfo.name}
              </span>
              <span className="text-xs font-semibold text-cyan-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-500" />
                <span>AI & Web Application Creator</span>
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
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-cyan-700 bg-cyan-50/90 font-bold border border-cyan-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/40'
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 rounded-xl border border-cyan-200 transition-colors shadow-2xs"
              title="Edit portfolio info, links, education, and uploads"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-600" />
              <span>Edit Portfolio</span>
            </button>

            <a
              id="nav-view-work-btn"
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 hover:from-cyan-400 hover:to-teal-500 rounded-xl shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform active:scale-95"
            >
              <span>Featured Apps</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              id="nav-contact-btn"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-700 bg-white hover:bg-cyan-50/60 border border-slate-200 hover:border-cyan-300 rounded-xl transition-all shadow-2xs"
            >
              <Mail className="w-4 h-4 text-cyan-500" />
              <span>Contact</span>
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
