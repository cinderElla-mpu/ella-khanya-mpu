import React from 'react';
import { Github, ExternalLink, GitBranch, FolderGit2, Star, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const GitHubSection: React.FC = () => {
  const { data } = usePortfolio();

  const repos = [
    {
      name: 'SparkGen-AI-Content-Generator-',
      description: 'AI-powered content generation application built with React, Supabase, and AI APIs.',
      url: 'https://github.com/cinderElla-mpu/SparkGen-AI-Content-Generator-',
      lang: 'JavaScript / React',
    },
    {
      name: 'kumbayaaa-travelingchatbot',
      description: 'Conversational travel assistant bot designed to guide user itineraries and destination plans.',
      url: 'https://github.com/cinderElla-mpu/kumbayaaa-travelingchatbot',
      lang: 'JavaScript / AI',
    },
    {
      name: 'ai-productivity-hub',
      description: 'Unified AI productivity suite bringing streamlined digital acceleration tools together.',
      url: 'https://github.com/cinderElla-mpu/ai-productivity-hub',
      lang: 'React / Web',
    },
  ];

  return (
    <section className="py-14 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative cyan ambient glow */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-700/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text and Call to Action */}
          <div className="max-w-xl text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>cinderElla-mpu</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
              Explore My GitHub
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Explore my projects and code on GitHub. Check out the repositories, inspect commit histories,
              and see how I structure components and AI workflows.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                id="github-section-profile-btn"
                href={data.personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform active:scale-95"
              >
                <Github className="w-5 h-5 text-slate-950" />
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-4 h-4 text-slate-950" />
              </a>

              <span className="text-xs text-slate-400 font-mono">
                @cinderElla-mpu
              </span>
            </div>
          </div>

          {/* Featured Repositories Quick Cards */}
          <div className="w-full lg:w-auto flex-1 max-w-lg flex flex-col gap-3">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400/80 hover:bg-slate-900 transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm font-semibold truncate">
                    <FolderGit2 className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span className="group-hover:underline truncate">{repo.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 shrink-0" />
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2">
                  {repo.description}
                </p>
                <div className="flex items-center gap-3 text-2xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {repo.lang}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    main
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
