import React from 'react';
import { Briefcase, Calendar, Building, Sparkles, CheckCircle2, Edit3, Plus, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Experience: React.FC = () => {
  const { data, openEditModal } = usePortfolio();

  return (
    <section id="experience" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
              <Briefcase className="w-3.5 h-3.5 text-cyan-600" />
              <span>Programmes & Practical Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Learning & Project Experience
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
              Focusing on structured technical acceleration programmes, collaborative builds, and practical application development.
            </p>
          </div>

          <button
            onClick={() => openEditModal('experience')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-xl border border-cyan-200 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Manage Experience Entries</span>
          </button>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {data.experience.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 hover:border-cyan-400 shadow-2xs hover:shadow-md transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                      Technical Programme
                    </span>
                    <span className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {item.programmeName}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                    <Building className="w-4 h-4 text-cyan-600" />
                    <span>Organisation: <strong className="text-slate-900 font-semibold">{item.organisation}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => openEditModal('experience')}
                  className="p-2 text-slate-600 hover:text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors self-start"
                  title="Edit entry"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* What I Learned */}
                <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                    <span>What I Learned</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.whatILearned}
                  </p>
                </div>

                {/* Projects Completed */}
                <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Projects Completed</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.projectsCompleted}
                  </p>
                </div>

                {/* Skills Developed */}
                <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Skills Developed</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.skillsDeveloped}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Additional Experience Categories Prompt */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => openEditModal('experience')}
              className="p-5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-cyan-300 bg-slate-50/40 hover:bg-cyan-50/30 transition-all cursor-pointer text-center group"
            >
              <h4 className="font-display font-semibold text-slate-800 text-sm group-hover:text-cyan-800 mb-1">
                + Group Technology Projects
              </h4>
              <p className="text-xs text-slate-600">Collaborative hackathons, group code sprints, and team builds.</p>
            </div>

            <div
              onClick={() => openEditModal('experience')}
              className="p-5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-cyan-300 bg-slate-50/40 hover:bg-cyan-50/30 transition-all cursor-pointer text-center group"
            >
              <h4 className="font-display font-semibold text-slate-800 text-sm group-hover:text-cyan-800 mb-1">
                + Web Development Projects
              </h4>
              <p className="text-xs text-slate-600">Frontend user interfaces, API experiments, and prototypes.</p>
            </div>

            <div
              onClick={() => openEditModal('experience')}
              className="p-5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-cyan-300 bg-slate-50/40 hover:bg-cyan-50/30 transition-all cursor-pointer text-center group"
            >
              <h4 className="font-display font-semibold text-slate-800 text-sm group-hover:text-cyan-800 mb-1">
                + Personal Projects & Work
              </h4>
              <p className="text-xs text-slate-600">Self-directed experimentation and other practical initiatives.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
