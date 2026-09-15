import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Projects } from './components/Projects.tsx';
import { GitHubSection } from './components/GitHubSection.tsx';
import { Education } from './components/Education.tsx';
import { Certifications } from './components/Certifications.tsx';
import { Experience } from './components/Experience.tsx';
import { Achievements } from './components/Achievements.tsx';
import { CVSection } from './components/CVSection.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { EditModal } from './components/EditModal.tsx';
import { Toast } from './components/Toast.tsx';

function MainPortfolioContent() {
  const [activeSection, setActiveSection] = useState('home');
  const { isLoading } = usePortfolio();

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'education', 'experience', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-500 font-display tracking-wider uppercase">
            Loading Ella's Portfolio...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-cyan-100 selection:text-cyan-900">
      {/* Sticky Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubSection />
        <Education />
        <Certifications />
        <Experience />
        <Achievements />
        <CVSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Edit Drawer / Modal */}
      <EditModal />

      {/* Persistent Toast Notifications */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainPortfolioContent />
    </PortfolioProvider>
  );
}
