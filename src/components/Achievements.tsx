import React from 'react';
import { Trophy, Award, Sparkles, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Achievements: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="achievements" className="py-16 md:py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5 text-cyan-600" />
              <span>Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Key Achievements
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
              Meaningful academic and project milestones accomplished on my learning journey.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.achievements.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group ${
                item.highlight
                  ? 'border-cyan-300 shadow-xs hover:border-cyan-500 hover:shadow-md'
                  : 'border-slate-200 hover:border-cyan-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                    <Trophy className="w-5 h-5" />
                  </div>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 font-display">
                  {item.subtitle}
                </span>

                <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mt-1 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                <span>Verified Milestone</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
