import React from 'react';
import { GraduationCap, Calendar, School, BookOpen, Sparkles, Edit3, Plus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Education: React.FC = () => {
  const { data, openEditModal } = usePortfolio();

  return (
    <section id="education" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-600" />
              <span>Academic Foundation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Education
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
              Formal qualifications and coursework supporting my technical journey and future studies.
            </p>
          </div>

          <button
            onClick={() => openEditModal('education')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-xl border border-cyan-200 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Education Details</span>
          </button>
        </div>

        {/* Education Timeline / Cards */}
        <div className="space-y-6">
          {data.education.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 hover:border-cyan-400 shadow-2xs hover:shadow-md transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {item.status}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                      Year Completed: <strong className="text-slate-800 font-semibold">{item.yearCompleted}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {item.qualification}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <School className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span className="font-medium">
                      School:{' '}
                      <span className="text-slate-900 font-semibold">
                        {item.school || '[Add School Name]'}
                      </span>
                    </span>
                    <button
                      onClick={() => openEditModal('education')}
                      className="text-xs text-cyan-600 hover:text-cyan-700 hover:underline ml-1"
                    >
                      (click to edit)
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => openEditModal('education')}
                  className="p-2 text-slate-600 hover:text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors self-start"
                  title="Edit details"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Sub-sections: Subjects & Coursework */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                {/* Relevant Subjects */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Relevant Subjects</span>
                    </h4>
                  </div>
                  {item.relevantSubjects && item.relevantSubjects.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {item.relevantSubjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs bg-white text-slate-700 border border-slate-200"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-600 italic">
                      No subjects added yet.{' '}
                      <button
                        onClick={() => openEditModal('education')}
                        className="text-cyan-600 hover:underline not-italic font-medium"
                      >
                        + Add Subjects
                      </button>
                    </div>
                  )}
                </div>

                {/* Additional Courses */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Additional Courses</span>
                    </h4>
                  </div>
                  {item.additionalCourses && item.additionalCourses.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {item.additionalCourses.map((crs, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs bg-white text-slate-700 border border-slate-200"
                        >
                          {crs}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-600 italic">
                      No courses added yet.{' '}
                      <button
                        onClick={() => openEditModal('education')}
                        className="text-cyan-600 hover:underline not-italic font-medium"
                      >
                        + Add Courses
                      </button>
                    </div>
                  )}
                </div>

                {/* Technology Courses */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Technology Courses</span>
                    </h4>
                  </div>
                  {item.technologyCourses && item.technologyCourses.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologyCourses.map((tc, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs bg-white text-slate-700 border border-slate-200"
                        >
                          {tc}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-600 italic">
                      No technology courses listed.{' '}
                      <button
                        onClick={() => openEditModal('education')}
                        className="text-cyan-600 hover:underline not-italic font-medium"
                      >
                        + Add
                      </button>
                    </div>
                  )}
                </div>

                {/* AI Courses */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                      <span>AI Courses</span>
                    </h4>
                  </div>
                  {item.aiCourses && item.aiCourses.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {item.aiCourses.map((aic, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs bg-white text-slate-700 border border-slate-200"
                        >
                          {aic}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-600 italic">
                      No AI courses listed.{' '}
                      <button
                        onClick={() => openEditModal('education')}
                        className="text-cyan-600 hover:underline not-italic font-medium"
                      >
                        + Add
                      </button>
                    </div>
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
