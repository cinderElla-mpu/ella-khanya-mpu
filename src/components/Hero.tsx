import React, { useRef } from 'react';
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Camera,
  UploadCloud,
  Trash2,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Hero: React.FC = () => {
  const {
    data,
    uploadProfilePicture,
    removeProfilePicture,
    downloadCurrentCV,
    openEditModal,
    showToast,
  } = usePortfolio();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file (PNG, JPG, WEBP).');
        return;
      }
      await uploadProfilePicture(file);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-cyan-100/80 bg-gradient-to-b from-white via-cyan-50/30 to-white"
    >
      {/* Vibrant background ambient glow with cyan, teal, and sky mesh */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-cyan-200/40 via-teal-100/30 to-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-cyan-300/25 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-teal-200/25 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Authentic Introduction */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-300/80 text-cyan-900 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-cyan-600 animate-spin-slow" />
              <span className="font-bold">Portfolio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
              <span className="text-cyan-700 font-medium">Active Explorer & Application Creator</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-sky-500 bg-clip-text text-transparent">
                  {data.personalInfo.name}
                </span>
                .
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-800 to-slate-800 bg-clip-text text-transparent font-display">
                {data.personalInfo.tagline}
              </p>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {data.personalInfo.intro}
            </p>

            {/* Quick highlight points with vibrant colored badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-teal-50/60 px-3.5 py-2 rounded-xl border border-cyan-200 shadow-2xs font-semibold text-cyan-900">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>{data.projects.length} Published Applications</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-emerald-50/60 px-3.5 py-2 rounded-xl border border-teal-200 shadow-2xs font-semibold text-teal-900">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>AI & Web Technologies</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-sky-50 to-indigo-50/50 px-3.5 py-2 rounded-xl border border-sky-200 shadow-2xs font-semibold text-sky-900">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Matric 2025 Graduate</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              {/* View My Projects */}
              <button
                id="hero-view-projects-btn"
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 hover:from-cyan-400 hover:to-teal-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/35 transition-all transform active:scale-95"
              >
                <span>Explore Featured Apps</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Download CV */}
              <button
                id="hero-download-cv-btn"
                onClick={downloadCurrentCV}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-cyan-50/50 text-slate-800 hover:text-cyan-700 font-semibold text-sm sm:text-base rounded-xl border border-slate-200 hover:border-cyan-300 shadow-xs transition-all active:scale-95"
                title={data.cvFile ? `Download ${data.cvFile.name}` : 'Upload your CV first'}
              >
                <Download className="w-4 h-4 text-cyan-600" />
                <span>{data.cvFile ? 'Download CV' : 'Download CV'}</span>
              </button>

              {/* GitHub */}
              <a
                id="hero-github-link"
                href={data.personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95"
                title="View GitHub Profile: cinderElla-mpu"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </a>

              {/* LinkedIn (Editable) */}
              {data.personalInfo.linkedInUrl ? (
                <a
                  id="hero-linkedin-link"
                  href={data.personalInfo.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 bg-white hover:bg-cyan-50 text-cyan-800 font-semibold text-sm rounded-xl border border-cyan-200 hover:border-cyan-300 shadow-xs transition-all"
                  title="View LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-cyan-600" />
                  <span>LinkedIn</span>
                </a>
              ) : (
                <button
                  id="hero-add-linkedin-btn"
                  onClick={() => openEditModal('general')}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 bg-white hover:bg-cyan-50 text-slate-600 hover:text-cyan-700 text-xs sm:text-sm font-medium rounded-xl border border-dashed border-cyan-300 transition-all"
                  title="Click to add your LinkedIn profile link"
                >
                  <Linkedin className="w-4 h-4 text-cyan-500" />
                  <span>+ Add LinkedIn</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Professional Profile Picture Area */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              id="profile-picture-file-input"
            />

            <div className="relative group w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
              {/* Outer decorative gradient aura */}
              <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-cyan-400 via-teal-300 to-sky-400 opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-sky-400 rotate-2 group-hover:rotate-0 transition-transform duration-300 opacity-80" />

              {/* Main Photo Frame */}
              <div className="relative w-full h-full rounded-3xl bg-white p-2.5 shadow-xl border-2 border-white flex flex-col items-center justify-center overflow-hidden">
                {data.profilePicture && data.profilePicture.dataUrl ? (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden group/img">
                    <img
                      src={data.profilePicture.dataUrl}
                      alt="Ella Khanya Mpu - Professional Profile"
                      className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-500 group-hover/img:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Floating verified badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-400/40 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Creator Profile</span>
                    </div>

                    {/* Floating project count badge */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-cyan-600/90 backdrop-blur-md border border-cyan-300 text-white text-xs font-bold flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3 text-cyan-200" />
                      <span>{data.projects.length} Apps Live</span>
                    </div>

                    {/* Action overlay on hover */}
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4 text-white">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-md transition-all transform active:scale-95"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Upload New Photo</span>
                      </button>
                      <button
                        onClick={removeProfilePicture}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Reset Photo</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Fallback if somehow photo removed */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full rounded-2xl border-2 border-dashed border-cyan-400 bg-cyan-50/60 hover:bg-cyan-50 transition-colors flex flex-col items-center justify-center p-6 text-center cursor-pointer group/placeholder"
                  >
                    <div className="w-16 h-16 rounded-full bg-white shadow-md border border-cyan-300 flex items-center justify-center text-cyan-600 mb-3 group-hover/placeholder:scale-110 transition-transform">
                      <Camera className="w-8 h-8" />
                    </div>
                    <span className="font-display font-bold text-slate-800 text-base mb-1">
                      Upload Profile Picture
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-[200px]">
                      Click to choose a photo from your device.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800 bg-white px-3.5 py-1.5 rounded-xl border border-cyan-300 shadow-2xs">
                      <UploadCloud className="w-3.5 h-3.5 text-cyan-600" />
                      Select Photo
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Picture Controls Underneath */}
            <div className="mt-4 flex items-center gap-3">
              <button
                id="hero-upload-photo-btn"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800 hover:text-cyan-900 bg-cyan-50 hover:bg-cyan-100 px-4 py-2 rounded-xl border border-cyan-200 transition-colors shadow-2xs"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-600" />
                <span>Change Photo</span>
              </button>

              {data.profilePicture && (
                <button
                  id="hero-remove-photo-btn"
                  onClick={removeProfilePicture}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 px-2 py-1.5 transition-colors"
                  title="Reset profile picture"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
