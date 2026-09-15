import React, { useRef, useState } from 'react';
import {
  FileText,
  Download,
  UploadCloud,
  Printer,
  CheckCircle2,
  RefreshCw,
  Mail,
  Phone,
  Github,
  Award,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const CVSection: React.FC = () => {
  const { data, uploadCV, downloadCurrentCV, showToast } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (
        !allowed.includes(file.type) &&
        !file.name.endsWith('.pdf') &&
        !file.name.endsWith('.docx') &&
        !file.name.endsWith('.doc')
      ) {
        showToast('Please upload a PDF or Word document (.pdf, .docx).');
        return;
      }
      await uploadCV(file);
    }
  };

  const handlePrintCV = () => {
    window.print();
  };

  return (
    <section
      id="cv-section"
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/70 border-b border-cyan-100 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-300 text-cyan-900 text-xs font-bold mb-3 shadow-2xs">
            <FileText className="w-3.5 h-3.5 text-cyan-600" />
            <span>Curriculum Vitae</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Curriculum{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
              Vitae
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            Review my complete resume below, verified credentials, and technical experience, or download an official PDF copy.
          </p>

          {/* Action Toolbar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              id="cv-section-download-btn"
              onClick={downloadCurrentCV}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 hover:from-cyan-400 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-md shadow-cyan-500/20 transition-all transform active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official CV (PDF)</span>
            </button>

            <button
              onClick={handlePrintCV}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-bold text-sm rounded-xl border border-slate-300 hover:border-cyan-400 shadow-2xs transition-all cursor-pointer"
              title="Print resume or save via browser print dialog"
            >
              <Printer className="w-4 h-4 text-cyan-600" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-3 bg-cyan-50 hover:bg-cyan-100 text-cyan-900 font-bold text-xs rounded-xl border border-cyan-200 transition-colors cursor-pointer"
              title="Upload your own customized CV file"
            >
              <UploadCloud className="w-4 h-4 text-cyan-600" />
              <span>Upload / Replace File</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              id="cv-file-upload-input"
            />
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Updated with Grade 12 (2025), CAPACITI (2026), and 8 Coursera Credentials</span>
          </div>
        </div>

        {/* Interactive Resume Document Display */}
        <div className="bg-white rounded-3xl border border-cyan-100 shadow-xl shadow-cyan-950/5 overflow-hidden transition-all">
          {/* Top Document Bar */}
          <div className="bg-slate-900 text-white px-6 sm:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs font-mono text-slate-300 font-medium hidden sm:inline-block">
                Ella_Khanya_Mpu_CV.pdf
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-cyan-400 font-medium">Standard A4 Format</span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
              >
                {isExpanded ? (
                  <>
                    <span>Collapse</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Expand</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Resume Body */}
          {isExpanded && (
            <div className="p-8 sm:p-12 md:p-16 max-w-4xl mx-auto font-sans text-slate-900 print:p-0 print:border-none">
              {/* CV Header */}
              <div className="text-center pb-8 border-b border-slate-200">
                <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-950">
                  {data.personalInfo.name || 'Ella Khanya Mpu'}
                </h1>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs sm:text-sm font-medium text-slate-600">
                  <a
                    href={`mailto:${data.personalInfo.email}`}
                    className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{data.personalInfo.email}</span>
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href="tel:0729396259"
                    className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{data.personalInfo.phone || '072 939 6259'}</span>
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href={data.personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-cyan-600" />
                    <span>github.com/cinderElla-mpu</span>
                  </a>
                </div>
              </div>

              {/* 1. SUMMARY */}
              <div className="pt-8 pb-6 border-b border-slate-200">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase font-display mb-3">
                  SUMMARY
                </h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  Motivated technology enthusiast who completed Grade 12 in 2025 and the CAPACITI AI Skills Acceleration Programme in 2026. Gained practical experience in Artificial Intelligence, Generative AI, prompt engineering, and web development. Developed an AI Workplace Productivity Hub as part of my practical learning. Eager to apply my skills, gain industry experience, and grow within the technology field.
                </p>
              </div>

              {/* 2. EDUCATION */}
              <div className="py-6 border-b border-slate-200">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase font-display mb-4">
                  EDUCATION
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        National Senior Certificate (Grade 12)
                      </h4>
                      <p className="text-xs text-slate-500">Secondary Education Foundation</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 sm:text-right">
                      Completed 2025
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        CAPACITI
                      </h4>
                      <p className="text-xs font-semibold text-cyan-800">
                        AI Skills Acceleration Programme
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        Applied training in Artificial Intelligence, Generative AI, Prompt Engineering, Responsible AI, and Web Development.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 sm:text-right">
                      Completed 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. PROJECTS */}
              <div className="py-6 border-b border-slate-200">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase font-display mb-4">
                  PROJECTS
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-bold text-slate-900">AI Workplace Productivity Hub</span>
                    <span className="text-slate-400 mx-2">|</span>
                    <span className="text-slate-700">
                      Created an AI-powered platform providing productivity tools, resources, and practical guidance to help users work more efficiently.
                    </span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900">PrasaConnect (MetroTrack AI)</span>
                    <span className="text-slate-400 mx-2">|</span>
                    <span className="text-slate-700">
                      Passenger journey assistant and commuter transit planning platform for Metrorail networks with route intelligence and community alerts.
                    </span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900">StaySense AI (RoamRate)</span>
                    <span className="text-slate-400 mx-2">|</span>
                    <span className="text-slate-700">
                      Accommodation review intelligence platform applying natural language sentiment analysis to simplify guest feedback insights.
                    </span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900">SparkGen</span>
                    <span className="text-slate-400 mx-2">|</span>
                    <span className="text-slate-700">
                      Multi-purpose generative AI content platform supporting social media, blog, email, and code prompt generations.
                    </span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900">TripBuddy AI</span>
                    <span className="text-slate-400 mx-2">|</span>
                    <span className="text-slate-700">
                      Conversational travel assistant guiding users through personalized trip recommendations and interactive itinerating.
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. TECHNICAL SKILLS */}
              <div className="py-6 border-b border-slate-200">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase font-display mb-4">
                  TECHNICAL SKILLS
                </h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <strong className="text-slate-900">Artificial Intelligence:</strong>{' '}
                    Generative AI, Prompt Engineering, Responsible AI, Large Language Models
                  </p>
                  <p>
                    <strong className="text-slate-900">Tools:</strong>{' '}
                    GitHub, AI-assisted development tools, React, JavaScript, HTML, CSS
                  </p>
                  <p>
                    <strong className="text-slate-900">Soft Skills:</strong>{' '}
                    Communication, problem-solving, adaptability, collaboration
                  </p>
                </div>
              </div>

              {/* 5. CERTIFICATIONS (8 CREDENTIALS) */}
              <div className="py-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase font-display">
                    VERIFIED CERTIFICATIONS ({data.certifications.length})
                  </h3>
                  <a
                    href="#certifications"
                    className="text-xs font-bold text-cyan-600 hover:text-cyan-700 inline-flex items-center gap-1"
                  >
                    <span>View Section</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {data.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-bold text-slate-900 leading-snug">
                            {cert.name}
                          </h5>
                          {cert.certificateLink && (
                            <a
                              href={cert.certificateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-600 hover:text-cyan-700 p-0.5 shrink-0"
                              title="View Certificate on Coursera"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        <p className="text-cyan-800 font-semibold mt-0.5">{cert.institution}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-slate-500 font-mono text-[10px]">
                        <span>{cert.dateCompleted}</span>
                        {cert.certificateLink ? (
                          <a
                            href={cert.certificateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-700 hover:text-cyan-900 font-semibold font-sans inline-flex items-center gap-1"
                          >
                            <span>View on Coursera</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          cert.credentialId && <span>ID: {cert.credentialId}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. LANGUAGES */}
              <div className="py-6 border-b border-slate-200">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase font-display mb-2">
                  LANGUAGES
                </h3>
                <p className="text-sm text-slate-800">
                  <strong className="font-bold">isiXhosa</strong> (Native) &bull;{' '}
                  <strong className="font-bold">English</strong> (Fluent)
                </p>
              </div>

              {/* 7. REFERENCES */}
              <div className="pt-6">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase font-display mb-2">
                  REFERENCES
                </h3>
                <p className="text-sm text-slate-600 italic">
                  Available on request.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
