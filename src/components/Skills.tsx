import React from 'react';
import { Cpu, Code2, Wrench, Sparkles, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();

  const getCategoryDetails = (title: string) => {
    if (title.toLowerCase().includes('ai')) {
      return {
        icon: Cpu,
        gradient: 'from-cyan-500 to-indigo-500',
        bg: 'bg-cyan-50/60',
        badge: 'AI & Data Stack',
        dotColor: 'bg-cyan-500',
        tagBg: 'bg-cyan-50/80 hover:bg-cyan-100 text-cyan-950 border-cyan-200',
      };
    }
    if (title.toLowerCase().includes('web')) {
      return {
        icon: Code2,
        gradient: 'from-teal-400 to-emerald-500',
        bg: 'bg-teal-50/60',
        badge: 'Frontend Engineering',
        dotColor: 'bg-teal-500',
        tagBg: 'bg-teal-50/80 hover:bg-teal-100 text-teal-950 border-teal-200',
      };
    }
    return {
      icon: Wrench,
      gradient: 'from-sky-500 to-purple-500',
      bg: 'bg-sky-50/60',
      badge: 'Modern Tooling',
      dotColor: 'bg-sky-500',
      tagBg: 'bg-sky-50/80 hover:bg-sky-100 text-sky-950 border-sky-200',
    };
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-gradient-to-b from-white via-cyan-50/30 to-white border-b border-cyan-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-300 text-cyan-900 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Technologies & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Skills &{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
              Learning Stack
            </span>
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            These are the technologies, frameworks, and developer platforms I am actively exploring,
            experimenting with, and applying across my software projects.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.skills.map((category) => {
            const { icon: Icon, gradient, badge, dotColor, tagBg } = getCategoryDetails(category.title);
            return (
              <div
                key={category.title}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-cyan-100 hover:border-cyan-400 shadow-xs hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 font-display">
                        {badge}
                      </span>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${tagBg} text-xs sm:text-sm font-semibold border transition-all cursor-default shadow-2xs`}
                      >
                        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-cyan-50 flex items-center gap-2 text-xs font-semibold text-cyan-800">
                  <CheckCircle className="w-4 h-4 text-cyan-600" />
                  <span>Actively applied in live projects</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Authenticity */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-cyan-50/80 via-teal-50/40 to-sky-50/80 border border-cyan-200 text-center max-w-2xl mx-auto shadow-2xs">
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-cyan-950 font-bold">Honest Learning Philosophy:</strong> I
            focus on building real applications with these tools to deepen my practical knowledge,
            rather than claiming commercial senior expertise.
          </p>
        </div>
      </div>
    </section>
  );
};
