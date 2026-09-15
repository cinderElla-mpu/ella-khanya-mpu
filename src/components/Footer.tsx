import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 relative">
      {/* Luminous Top Gradient Strip */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-500 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left space-y-1.5">
            <h3 className="text-xl font-display font-bold text-white tracking-tight">
              {data.personalInfo.name}
            </h3>
            <p className="text-sm bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent font-medium">
              Building, learning, and creating with web & AI technologies.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={data.personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all shadow-sm"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>

            {data.personalInfo.linkedInUrl && (
              <a
                href={data.personalInfo.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all shadow-sm"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            <a
              href={`mailto:${data.personalInfo.email}`}
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all shadow-sm"
              title="Email Ella"
              aria-label="Email Ella"
            >
              <Mail className="w-5 h-5" />
            </a>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all ml-2"
              title="Scroll to Top"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 Ella Khanya Mpu. All rights reserved.</p>
          <p className="text-slate-400">
            Technology Enthusiast • Application Creator • AI Explorer
          </p>
        </div>
      </div>
    </footer>
  );
};
