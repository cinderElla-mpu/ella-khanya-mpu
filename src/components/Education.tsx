import React from 'react';
import { GraduationCap, Calendar, School, BookOpen, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Education: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="education" className="py-16 md:py-24 bg-white border-b border-cyan-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-300 text-cyan-900 text-xs font-bold mb-3 shadow-2xs">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-600" />
              <span>Academic Foundation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Education &{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                Coursework
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
              Formal qualifications, foundational coursework, and independent technical studies supporting my journey.
            </p>
          </div>
        </div>

        {/* Education Timeline / Cards */}
        <div className="space-y-6">
          {data.education.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-cyan-100 hover:border-cyan-400 shadow-xs hover:shadow-xl hover:shadow-cyan-500/10 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-cyan-50">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-100/80 text-cyan-900 border border-cyan-300">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-600" />
                      {item.status}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                      Year Completed: <strong className="text-slate-900 font-bold">{item.yearCompleted}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {item.qualification}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <School className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span className="font-medium">
                      School:{' '}
                      <span className="text-slate-900 font-bold">
                        {item.school || 'High School'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-sections: Subjects & Coursework */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
                {/* Relevant Subjects */}
                <div className="p-4 rounded-2xl bg-cyan-50/40 border border-cyan-100 hover:border-cyan-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-900 font-display flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Relevant Subjects</span>
                    </h4>
                  </div>
                  {item.relevantSubjects && item.relevantSubjects.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {item.relevantSubjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-cyan-950 border border-cyan-200 shadow-2xs"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">Core Academic Subjects</div>
                  )}
                </div>

                {/* Additional Courses */}
                <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 hover:border-teal-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 font-display flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      <span>Additional Courses</span>
                    </h4>
                  </div>
                  {item.additionalCourses && item.additionalCourses.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {item.additionalCourses.map((crs, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-teal-950 border border-teal-200 shadow-2xs"
                        >
                          {crs}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">Self-directed Learning</div>
                  )}
                </div>

                {/* Technology Courses */}
                <div className="p-4 rounded-2xl bg-sky-50/40 border border-sky-100 hover:border-sky-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 font-display flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                      <span>Technology Courses</span>
                    </h4>
                  </div>
                  {item.technologyCourses && item.technologyCourses.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologyCourses.map((tc, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-sky-950 border border-sky-200 shadow-2xs"
                        >
                          {tc}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">Software Fundamentals</div>
                  )}
                </div>

                {/* AI Courses */}
                <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100 hover:border-indigo-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 font-display flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>AI Courses</span>
                    </h4>
                  </div>
                  {item.aiCourses && item.aiCourses.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {item.aiCourses.map((aic, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-indigo-950 border border-indigo-200 shadow-2xs"
                        >
                          {aic}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">Machine Learning & LLMs</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
