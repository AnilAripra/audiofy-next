import React from 'react';

interface SettingsTabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SettingsTabs({ tabs, activeTab, setActiveTab }: SettingsTabsProps) {
  return (
    <div className="flex items-center gap-1 border-b border-white/10 overflow-x-auto mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
            activeTab === tab
              ? 'text-orange-400 border-b-2 border-orange-400 bg-white/5'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
