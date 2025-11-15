import React from "react";
import { TabType } from "@/hooks/useNavigation";
import DemosPanel from "@/components/DemosPanel";

interface DemosTabProps {
  openTab: (tab: TabType) => void;
}

export const DemosTab: React.FC<DemosTabProps> = ({ openTab }) => {
  return (
    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 p-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => openTab("home")} 
          className="flex items-center text-gray-600 dark:text-white/60 hover:text-sky-600 dark:hover:text-sky-300 transition-colors mr-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-sky-600 dark:text-sky-300">AI Demos — Interactive</h2>
      <DemosPanel />
    </div>
  );
};