import React, { useRef } from 'react';
import { FileText, Download, UploadCloud, Trash2, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const CVSection: React.FC = () => {
  const { data, uploadCV, removeCV, downloadCurrentCV, showToast } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowed.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
        showToast('Please upload a PDF or Word document (.pdf, .docx).');
        return;
      }
      await uploadCV(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section id="cv-section" className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-slate-50/70 border border-slate-200 rounded-3xl p-8 sm:p-10 md:p-12 text-center">
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 text-cyan-600" />
            <span>Curriculum Vitae</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight mb-3">
            My CV
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Download my latest curriculum vitae outlining my academic record, project builds, and
            technical skills, or upload an updated copy at any time.
          </p>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            id="cv-file-upload-input"
          />

          {data.cvFile ? (
            /* CV Available Card */
            <div className="bg-white rounded-2xl p-6 border border-cyan-300 shadow-xs max-w-md mx-auto mb-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-slate-900 text-base truncate">
                    {data.cvFile.name}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                    <span>{formatFileSize(data.cvFile.size)}</span>
                    <span>•</span>
                    <span>Uploaded {new Date(data.cvFile.uploadedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-cyan-700 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Saved & ready for download</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  id="cv-section-download-btn"
                  onClick={downloadCurrentCV}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl transition-colors"
                    title="Replace with new CV file"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Replace</span>
                  </button>

                  <button
                    onClick={removeCV}
                    className="p-2 text-slate-600 hover:text-rose-600 transition-colors"
                    title="Remove CV"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Upload Prompt Box */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="bg-white rounded-2xl p-8 border-2 border-dashed border-cyan-300 hover:border-cyan-500 hover:bg-cyan-50/20 transition-all max-w-md mx-auto mb-6 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h4 className="font-display font-bold text-slate-900 text-base mb-1">
                Upload CV
              </h4>
              <p className="text-xs text-slate-600 mb-4">
                Upload your resume file (.PDF or .DOCX). It will be stored locally and made available for instant download.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Select Document</span>
              </button>
            </div>
          )}

          <p className="text-2xs text-slate-600">
            Files are persisted securely in your browser's IndexedDB storage. You do not need to modify any code to update your CV.
          </p>
        </div>
      </div>
    </section>
  );
};
