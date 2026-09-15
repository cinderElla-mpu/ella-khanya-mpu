import React from 'react';
import { Award, Calendar, ExternalLink, Plus, Edit3, Trash2, BookCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Certifications: React.FC = () => {
  const { data, openEditModal, deleteCertification } = usePortfolio();

  return (
    <section id="certifications" className="py-16 md:py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-cyan-600" />
              <span>Continuous Learning</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Certifications & Courses
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
              Online courses, workshops, and verified certifications earned in software development and artificial intelligence.
            </p>
          </div>

          <button
            onClick={() => openEditModal('certifications')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certification / Course</span>
          </button>
        </div>

        {/* Certifications Grid */}
        {data.certifications && data.certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-cyan-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={() => openEditModal('certifications')}
                        className="p-1 text-slate-600 hover:text-cyan-600 rounded-md"
                        title="Edit certification"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCertification(cert.id)}
                        className="p-1 text-slate-600 hover:text-rose-600 rounded-md"
                        title="Delete certification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-cyan-600 transition-colors leading-snug">
                    {cert.name}
                  </h3>
                  <div className="text-sm font-medium text-cyan-700 mt-1">
                    {cert.institution}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Completed {cert.dateCompleted}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {cert.certificateLink && (
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <a
                      href={cert.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
                    >
                      <span>View Credential / Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Clean Empty Placeholder */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-dashed border-slate-200 text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-3">
              <BookCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-800 mb-1">
              Add Your Certifications & Courses
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 max-w-md mx-auto">
              As you complete technical bootcamps, workshops, and online specializations, you can
              record and display them here anytime.
            </p>
            <button
              onClick={() => openEditModal('certifications')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Course or Certificate</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
