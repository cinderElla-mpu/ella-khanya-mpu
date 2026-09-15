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
    { label: 'Technology', icon: Cpu, gradient: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-50/70', border: 'border-cyan-200 hover:border-cyan-400', text: 'text-cyan-950' },
    { label: 'Artificial Intelligence', icon: Sparkles, gradient: 'from-teal-400 to-cyan-500', bg: 'bg-teal-50/70', border: 'border-teal-200 hover:border-teal-400', text: 'text-teal-950' },
    { label: 'Web Development', icon: Globe, gradient: 'from-sky-500 to-indigo-500', bg: 'bg-sky-50/70', border: 'border-sky-200 hover:border-sky-400', text: 'text-sky-950' },
    { label: 'Creating Applications', icon: Rocket, gradient: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-50/70', border: 'border-indigo-200 hover:border-indigo-400', text: 'text-indigo-950' },
    { label: 'Learning Technologies', icon: Compass, gradient: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50/70', border: 'border-emerald-200 hover:border-emerald-400', text: 'text-emerald-950' },
  ];

  const appHighlights = data.projects.map((proj) => ({
    id: proj.id,
    name: proj.name,
    summary: proj.description,
    tag: proj.badge || proj.category || 'Featured',
  }));

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-cyan-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-300/80 text-cyan-900 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Building with Curiosity,{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
              {data.personalInfo.name}
            </span>
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
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-800 font-display">
              Core Areas of Interest
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {interests.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl ${item.bg} border ${item.border} shadow-2xs hover:shadow-md transition-all text-center group transform hover:-translate-y-0.5`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-bold ${item.text} transition-colors`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Applications I've Created */}
        <div className="rounded-3xl bg-gradient-to-br from-cyan-50/50 via-teal-50/20 to-sky-50/40 border border-cyan-200/80 p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-700 font-bold text-xs uppercase tracking-wider font-display mb-1">
                <Layers className="w-4 h-4 text-cyan-600" />
                <span>Featured Project Directory</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                Applications I've Created ({data.projects.length})
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
              Click any project card to inspect its full architecture, live interactive deployment, features, and source repository below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appHighlights.map((app) => (
              <div
                key={app.id}
                onClick={() => scrollToProject(app.id)}
                className="cursor-pointer group p-5 rounded-2xl bg-white border border-cyan-100 hover:border-cyan-400 shadow-xs hover:shadow-md hover:shadow-cyan-500/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <h4 className="font-display font-bold text-slate-900 text-base sm:text-lg group-hover:text-cyan-600 transition-colors">
                      {app.name}
                    </h4>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 shrink-0">
                      {app.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {app.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600 group-hover:text-cyan-700">
                  <span>Explore Architecture & Live App</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
