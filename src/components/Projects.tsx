import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  Edit3,
  Bot,
  Plane,
  Building2,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Train,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { ProjectItem } from '../types.ts';

export const Projects: React.FC = () => {
  const { data, openEditModal } = usePortfolio();

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'metromap-ai':
        return Train;
      case 'staysense-roamrate':
        return Building2;
      case 'sparkgen':
        return FileText;
      case 'tripbuddy-ai':
        return Plane;
      case 'ai-productivity-hub':
        return Bot;
      default:
        return Layers;
    }
  };

  const getGradientTheme = (id: string) => {
    switch (id) {
      case 'metromap-ai':
        return 'from-emerald-500/10 via-cyan-500/5 to-slate-50';
      case 'staysense-roamrate':
        return 'from-cyan-500/10 via-cyan-500/5 to-slate-50';
      case 'sparkgen':
        return 'from-sky-500/10 via-cyan-500/5 to-slate-50';
      case 'tripbuddy-ai':
        return 'from-teal-500/10 via-cyan-500/5 to-slate-50';
      case 'ai-productivity-hub':
        return 'from-cyan-600/10 via-cyan-500/5 to-slate-50';
      default:
        return 'from-cyan-500/10 to-slate-50';
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5 text-cyan-600" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Featured Applications
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
              These are the applications I have developed and published. They demonstrate how I combine
              frontend architecture, transit intelligence, sentiment analysis, conversational flows, and AI APIs into practical user solutions.
            </p>
          </div>

          <button
            onClick={() => openEditModal('projects')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-xl border border-cyan-200 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Manage Project Links</span>
          </button>
        </div>

        {/* 4 Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {data.projects.map((project, index) => {
            const ProjectIcon = getProjectIcon(project.id);
            const gradientBg = getGradientTheme(project.id);

            return (
              <div
                id={project.id}
                key={project.id}
                className="group relative bg-white rounded-3xl border border-slate-200 hover:border-cyan-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Header / Banner */}
                <div
                  className={`p-6 sm:p-8 bg-gradient-to-br ${gradientBg} border-b border-slate-100 relative`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-cyan-200 flex items-center justify-center text-cyan-600 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                        <ProjectIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 font-display">
                          Project 0{index + 1} • {project.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 leading-tight">
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    {project.badge && (
                      <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-cyan-700 border border-cyan-200 shadow-2xs">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  {/* Clarification note for StaySense AI / RoamRate */}
                  {project.note && (
                    <div className="mt-3.5 px-3.5 py-1.5 rounded-xl bg-cyan-100/70 border border-cyan-300/60 text-cyan-900 text-xs flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>{project.note}</span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Key Features</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 mt-0.5 shrink-0" />
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display mb-2.5">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 group-hover:border-cyan-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-6 py-4 sm:px-8 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {/* View Code / GitHub */}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:text-white bg-white hover:bg-slate-900 border border-slate-200 rounded-xl transition-all shadow-2xs"
                        title={`View repository on GitHub`}
                      >
                        <Github className="w-4 h-4 text-cyan-500" />
                        <span>View Code</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => openEditModal('projects')}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-cyan-700 bg-white border border-dashed border-slate-300 rounded-xl transition-colors"
                        title="Add GitHub repository link"
                      >
                        <Plus className="w-3.5 h-3.5 text-cyan-600" />
                        <span>Add Code Link</span>
                      </button>
                    )}

                    {/* View Live / Demo */}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl transition-all shadow-xs"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl transition-all shadow-xs"
                      >
                        <span>View Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => openEditModal('projects')}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-cyan-700 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl transition-colors"
                        title="Configure live deployment URL"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Set Live URL</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => openEditModal('projects')}
                    className="p-1.5 text-slate-600 hover:text-cyan-600 transition-colors"
                    title="Edit project details"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
