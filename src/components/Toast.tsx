import React from 'react';
import { CheckCircle, Info } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Toast: React.FC = () => {
  const { toastMessage } = usePortfolio();

  if (!toastMessage) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-none"
    >
      <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700 text-xs sm:text-sm font-medium">
        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </aside>
  );
};
