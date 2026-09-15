import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, Plus, Edit3, Trash2, BookCheck, ShieldCheck, Copy, Check, UserCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { CertificationItem } from '../types.ts';

export const Certifications: React.FC = () => {
  const { data, openEditModal, deleteCertification, showToast } = usePortfolio();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const certs = data.certifications || [];

  const filterCertificates = (item: CertificationItem) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'stanford') {
      return (
        item.institution.toLowerCase().includes('stanford') ||
        item.institution.toLowerCase().includes('deeplearning')
      );
    }
    if (selectedFilter === 'ibm') {
      return item.institution.toLowerCase().includes('ibm');
    }
    if (selectedFilter === 'google') {
      return item.institution.toLowerCase().includes('google');
    }
    if (selectedFilter === 'aws') {
      return item.institution.toLowerCase().includes('aws') || item.institution.toLowerCase().includes('amazon');
    }
    return true;
  };

  const handleCopyCredential = (id: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      showToast(`Copied credential ID: ${code}`);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const getProviderTheme = (cert: CertificationItem) => {
    const inst = cert.institution.toLowerCase();
    if (inst.includes('google')) {
      return {
        badgeBg: 'bg-sky-50 text-sky-800 border-sky-200',
        dotBg: 'bg-sky-500',
        pill: 'Google Cloud',
        gradient: 'from-sky-500 to-blue-600',
        hoverBorder: 'hover:border-sky-400',
      };
    }
    if (inst.includes('stanford') || inst.includes('deeplearning')) {
      return {
        badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
        dotBg: 'bg-rose-500',
        pill: 'Stanford / DeepLearning.AI',
        gradient: 'from-rose-500 to-red-600',
        hoverBorder: 'hover:border-rose-400',
      };
    }
    if (inst.includes('ibm')) {
      return {
        badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
        dotBg: 'bg-blue-600',
        pill: 'IBM',
        gradient: 'from-blue-600 to-indigo-600',
        hoverBorder: 'hover:border-blue-400',
      };
    }
    if (inst.includes('aws') || inst.includes('amazon')) {
      return {
        badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
        dotBg: 'bg-amber-500',
        pill: 'AWS & DeepLearning.AI',
        gradient: 'from-amber-500 to-orange-600',
        hoverBorder: 'hover:border-amber-400',
      };
    }
    return {
      badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      dotBg: 'bg-cyan-500',
      pill: 'Verified Course',
      gradient: 'from-cyan-500 to-teal-600',
      hoverBorder: 'hover:border-cyan-400',
    };
  };

  const filteredCerts = certs.filter(filterCertificates);

  return (
    <section id="certifications" className="py-16 md:py-24 bg-gradient-to-b from-white via-cyan-50/20 to-white border-b border-cyan-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 -left-20 w-80 h-80 rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-teal-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-300 text-cyan-900 text-xs font-bold mb-3 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-cyan-600" />
              <span>Verified Technical Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Certifications &{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                Specializations
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
              Official online specializations and certifications completed across Generative AI, Machine Learning, Prompt Engineering, and Python, authorized by Google Cloud, Stanford Online, IBM, and AWS.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-cyan-100/70 border border-cyan-200 text-cyan-900 text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600" />
              <span>{certs.length} Verified Certificates</span>
            </div>
            <button
              onClick={() => openEditModal('certifications')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 rounded-xl border border-cyan-200 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Credential</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-700'
            }`}
          >
            All Credentials ({certs.length})
          </button>
          <button
            onClick={() => setSelectedFilter('stanford')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'stanford'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-700'
            }`}
          >
            Stanford / DeepLearning.AI
          </button>
          <button
            onClick={() => setSelectedFilter('ibm')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'ibm'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700'
            }`}
          >
            IBM
          </button>
          <button
            onClick={() => setSelectedFilter('google')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'google'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700'
            }`}
          >
            Google Cloud
          </button>
          <button
            onClick={() => setSelectedFilter('aws')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'aws'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-800'
            }`}
          >
            AWS
          </button>
        </div>

        {/* Certifications Grid */}
        {filteredCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredCerts.map((cert, index) => {
              const theme = getProviderTheme(cert);
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
                  className={`bg-white rounded-3xl p-6 sm:p-7 border border-cyan-100/80 ${theme.hoverBorder} shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 transition-all flex flex-col justify-between group relative overflow-hidden`}
                >
                  {/* Decorative top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />

                  <div>
                    {/* Header line with Provider Pill and Action buttons */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${theme.badgeBg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg}`} />
                          {theme.pill}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Coursera Verified</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal('certifications')}
                          className="p-1.5 text-slate-400 hover:text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors"
                          title="Edit certification"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCertification(cert.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete certification"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 group-hover:text-cyan-600 transition-colors leading-snug mb-1.5">
                      {cert.name}
                    </h3>

                    {/* Authorized Institution */}
                    <div className="text-xs font-bold text-cyan-800 mb-2 font-display">
                      {cert.institution}
                    </div>

                    {/* Instructor line if present */}
                    {cert.instructor && (
                      <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <UserCheck className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span>Instructor: <strong className="text-slate-800 font-semibold">{cert.instructor}</strong></span>
                      </div>
                    )}

                    {/* Date and Credential details */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                        <span>Completed: <strong className="text-slate-700">{cert.dateCompleted}</strong></span>
                      </div>

                      {cert.credentialId && (
                        <div className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                          <span>ID: {cert.credentialId}</span>
                          <button
                            onClick={(e) => handleCopyCredential(cert.id, cert.credentialId!, e)}
                            className="text-slate-400 hover:text-cyan-600 ml-0.5"
                            title="Copy Credential ID"
                          >
                            {copiedId === cert.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Course Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  {/* Verification action footer */}
                  {cert.certificateLink && (
                    <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <a
                        href={cert.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all group/btn"
                      >
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        <span>View Certificate on Coursera</span>
                      </a>

                      {cert.credentialId && (
                        <a
                          href={`https://www.coursera.org/account/accomplishments/verify/${cert.credentialId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-cyan-800 hover:text-cyan-900 font-semibold inline-flex items-center gap-1 hover:underline"
                          title="Direct Coursera Verification Record"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                          <span>Verify Record</span>
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-dashed border-slate-200 text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-3">
              <BookCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-800 mb-1">
              No certifications match this filter
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 max-w-md mx-auto">
              Select another provider filter above or reset to view all verified credentials.
            </p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl shadow-xs transition-colors"
            >
              <span>View All Credentials</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
