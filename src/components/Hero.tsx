import React, { useRef } from 'react';
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Sparkles,
  CheckCircle2,
  Code2,
  Award,
  MapPin,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Camera,
  Trash2,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
        showToast('Please select a valid image file (PNG, JPG, or WEBP).');
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
      {/* Hidden native image file input for adding user's photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        id="hero-picture-file-input"
        aria-label="Upload personal profile photo"
      />

      {/* Vibrant background ambient glow with cyan, teal, and sky mesh & gentle motion */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-cyan-200/40 via-teal-100/30 to-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          x: [0, 15, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-cyan-300/20 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          x: [0, -15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-teal-200/20 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Authentic Introduction with animations */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-300/80 text-cyan-900 text-xs sm:text-sm font-semibold shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-cyan-600 animate-spin-slow" />
              <span className="font-bold">Portfolio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
              <span className="text-cyan-700 font-medium">Active Explorer & Application Creator</span>
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.12]"
              >
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-sky-500 bg-clip-text text-transparent">
                  {data.personalInfo.name}
                </span>
                .
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-800 to-slate-800 bg-clip-text text-transparent font-display"
              >
                {data.personalInfo.tagline}
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              {data.personalInfo.intro}
            </motion.p>

            {/* Quick highlight points with vibrant colored badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs sm:text-sm"
            >
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
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3.5"
            >
              {/* View My Projects */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="hero-view-projects-btn"
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 hover:from-cyan-400 hover:to-teal-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/35 transition-all"
              >
                <span>Explore Featured Apps</span>
                <ArrowDown className="w-4 h-4" />
              </motion.button>

              {/* Download CV */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="hero-download-cv-btn"
                onClick={downloadCurrentCV}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-cyan-50/50 text-slate-800 hover:text-cyan-700 font-semibold text-sm sm:text-base rounded-xl border border-slate-200 hover:border-cyan-300 shadow-xs transition-all"
                title={data.cvFile ? `Download ${data.cvFile.name}` : 'Upload your CV first'}
              >
                <Download className="w-4 h-4 text-cyan-600" />
                <span>{data.cvFile ? 'Download CV' : 'Download CV'}</span>
              </motion.button>

              {/* Add Picture Option directly on Hero */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="hero-add-my-picture-btn"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-3.5 bg-cyan-50 hover:bg-cyan-100/80 text-cyan-800 font-semibold text-sm rounded-xl border border-cyan-300 shadow-xs transition-all"
                title="Add or update your profile picture"
              >
                <Camera className="w-4 h-4 text-cyan-600" />
                <span>{data.profilePicture?.dataUrl ? 'Change Picture' : '+ Add Picture'}</span>
              </motion.button>

              {/* GitHub */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="hero-github-link"
                href={data.personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all"
                title="View GitHub Profile: cinderElla-mpu"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </motion.a>

              {/* LinkedIn (Editable) */}
              {data.personalInfo.linkedInUrl ? (
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  id="hero-linkedin-link"
                  href={data.personalInfo.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 bg-white hover:bg-cyan-50 text-cyan-800 font-semibold text-sm rounded-xl border border-cyan-200 hover:border-cyan-300 shadow-xs transition-all"
                  title="View LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-cyan-600" />
                  <span>LinkedIn</span>
                </motion.a>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  id="hero-add-linkedin-btn"
                  onClick={() => openEditModal('general')}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 bg-white hover:bg-cyan-50 text-slate-600 hover:text-cyan-700 text-xs sm:text-sm font-medium rounded-xl border border-dashed border-cyan-300 transition-all"
                  title="Click to add your LinkedIn profile link"
                >
                  <Linkedin className="w-4 h-4 text-cyan-500" />
                  <span>+ Add LinkedIn</span>
                </motion.button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: Professional Spotlight Card with animated photo option */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center w-full"
          >
            <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-cyan-200/80 shadow-xl shadow-cyan-500/5 relative overflow-hidden group">
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-300/25 to-teal-300/25 rounded-full blur-2xl pointer-events-none -z-10" />

              {/* Header with Photo/Monogram & Identity */}
              <div className="flex items-start gap-4 pb-5 border-b border-slate-100">
                <div className="relative shrink-0">
                  <AnimatePresence mode="wait">
                    {data.profilePicture?.dataUrl ? (
                      <motion.div
                        key="user-photo"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-4 ring-cyan-200 shadow-md cursor-pointer group/photo"
                        title="Click to change profile picture"
                      >
                        <img
                          src={data.profilePicture.dataUrl}
                          alt={data.personalInfo.name}
                          className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Camera className="w-5 h-5 text-cyan-200" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="monogram"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-cyan-600 flex flex-col items-center justify-center text-white font-extrabold text-2xl shadow-md ring-4 ring-cyan-100 cursor-pointer group/mono relative"
                        title="Click to add your picture"
                      >
                        <span>EK</span>
                        <div className="absolute inset-0 rounded-2xl bg-slate-900/60 opacity-0 group-hover/mono:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] font-sans font-semibold">
                          <Plus className="w-4 h-4 text-cyan-300" />
                          <span>Add Photo</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-white"
                    title="Active Developer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl truncate">
                      {data.personalInfo.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-cyan-800 mt-0.5">
                    AI & Full-Stack Developer
                  </p>

                  {/* Photo Actions or Add Prompt */}
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    {data.profilePicture?.dataUrl ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-700 hover:text-cyan-900 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3 text-cyan-600" />
                          <span>Change Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={removeProfilePicture}
                          className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-200 transition-colors"
                          title="Remove uploaded picture"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-700 hover:text-cyan-900 bg-cyan-50 hover:bg-cyan-100/70 px-2.5 py-1 rounded-full border border-cyan-200 transition-colors shadow-2xs"
                      >
                        <Camera className="w-3 h-3 text-cyan-600" />
                        <span>+ Add My Picture</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Credentials & Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 py-5 border-b border-slate-100">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100/80 space-y-0.5 transition-shadow"
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Award className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Certifications</span>
                  </div>
                  <div className="font-display font-extrabold text-slate-900 text-base sm:text-lg">
                    {data.certifications.length} Verified
                  </div>
                  <div className="text-[10px] text-cyan-700 font-semibold truncate">
                    Stanford & Google & IBM
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100/80 space-y-0.5 transition-shadow"
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Code2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Applications</span>
                  </div>
                  <div className="font-display font-extrabold text-slate-900 text-base sm:text-lg">
                    {data.projects.length} Published
                  </div>
                  <div className="text-[10px] text-teal-700 font-semibold truncate">
                    Full-Stack & AI Systems
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100/80 space-y-0.5 transition-shadow"
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                    <span>Acceleration</span>
                  </div>
                  <div className="font-display font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                    CAPACITI 2026
                  </div>
                  <div className="text-[10px] text-sky-700 font-semibold truncate">
                    Matric 2025 Graduate
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100/80 space-y-0.5 transition-shadow"
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Location</span>
                  </div>
                  <div className="font-display font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                    South Africa
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold truncate">
                    Cape Town & Remote
                  </div>
                </motion.div>
              </div>

              {/* Technical Stack Pills */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Core Technical Proficiency</span>
                  </span>
                  <span className="text-[11px] text-cyan-700 font-semibold">Active Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Python', 'PyTorch', 'React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Generative AI'].map(
                    (tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-2.5 py-1 rounded-lg bg-cyan-50/70 border border-cyan-200/80 text-cyan-900 text-xs font-semibold cursor-default"
                      >
                        {tech}
                      </motion.span>
                    )
                  )}
                </div>
              </div>

              {/* Verification & Action Banner */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span>Stanford, DeepLearning.AI & Google</span>
                </div>
                <button
                  onClick={() => scrollToSection('certifications')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-900 hover:underline shrink-0"
                >
                  <span>Verify All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
