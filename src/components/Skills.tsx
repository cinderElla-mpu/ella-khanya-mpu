import React from 'react';
import { Cpu, Code2, Wrench, Sparkles, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();

  const getCategoryIcon = (title: string) => {
    if (title.toLowerCase().includes('ai')) return Cpu;
    if (title.toLowerCase().includes('web')) return Code2;
    return Wrench;
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Technologies & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Skills & Learning Stack
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            These are the technologies, frameworks, and developer platforms I am actively exploring,
            experimenting with, and applying across my software projects.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.skills.map((category) => {
            const Icon = getCategoryIcon(category.title);
            return (
              <div
                key={category.title}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-cyan-400 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                        {category.title}
                      </h3>
                      <span className="text-xs text-slate-600 font-medium">
                        {category.skills.length} core focus areas
                      </span>
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-800 text-xs sm:text-sm font-medium border border-slate-200 hover:border-cyan-300 transition-colors cursor-default"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Actively applied in projects</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Authenticity */}
        <div className="mt-10 p-4 rounded-2xl bg-white border border-slate-200 text-center max-w-2xl mx-auto">
          <p className="text-xs text-slate-600">
            <strong className="text-slate-800 font-semibold">Honest Learning Philosophy:</strong> I
            focus on building real applications with these tools to deepen my practical knowledge,
            rather than claiming commercial senior expertise.
          </p>
        </div>
      </div>
    </section>
  );
};
