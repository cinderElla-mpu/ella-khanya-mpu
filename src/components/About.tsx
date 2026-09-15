import React from 'react';
import { Sparkles, ArrowRight, Code, Cpu, Globe, Rocket, Compass, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const About: React.FC = () => {
  const { data } = usePortfolio();

  const scrollToProject = (projectId: string) => {
    const el = document.getElementById(projectId);
    if (el) {
      const navHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  const interests = [
    { label: 'Technology', icon: Cpu },
    { label: 'Artificial Intelligence', icon: Sparkles },
    { label: 'Web Development', icon: Globe },
    { label: 'Creating Applications', icon: Rocket },
    { label: 'Learning New Technologies', icon: Compass },
  ];

  const appHighlights = data.projects.map((proj) => ({
    id: proj.id,
    name: proj.name,
    summary: proj.description,
    tag: proj.badge || proj.category || 'Featured',
  }));

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            {data.personalInfo.name}
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            I am a technology enthusiast who loves building and experimenting with digital tools.
            Rather than a seasoned specialist, I am an enthusiastic creator at the beginning of my
            journey—focused on hands-on project building, practical problem solving, and understanding
            how artificial intelligence can enrich modern web experiences.
          </p>
        </div>

        {/* Interests Grid */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-700 mb-4 font-display">
            Core Areas of Interest
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {interests.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/30 shadow-2xs hover:shadow-xs transition-all text-center group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-2.5 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-cyan-900 transition-colors">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Applications I've Created */}
        <div className="rounded-3xl bg-slate-50/70 border border-slate-200 p-6 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-600 font-semibold text-xs uppercase tracking-wider font-display mb-1">
                <Layers className="w-4 h-4" />
                <span>Featured Builds</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                Applications I've Created
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
              Click any application card to inspect its full architecture, features, and source repository below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appHighlights.map((app) => (
              <div
                key={app.id}
                onClick={() => scrollToProject(app.id)}
                className="cursor-pointer group p-5 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-display font-bold text-slate-900 text-lg group-hover:text-cyan-600 transition-colors">
                      {app.name}
                    </h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                      {app.tag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {app.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-cyan-600 group-hover:text-cyan-700">
                  <span>View Full Project Details</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
