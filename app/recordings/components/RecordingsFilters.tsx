import React from 'react';
import { Search, Filter, RotateCcw, X } from 'lucide-react';

interface RecordingsFiltersProps {
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  quickFilters: Record<string, boolean>;
  toggleQuickFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function RecordingsFilters({
  showAdvancedFilters,
  setShowAdvancedFilters,
  quickFilters,
  toggleQuickFilter,
  searchQuery,
  setSearchQuery,
}: RecordingsFiltersProps) {
  return (
    <>
      {/* Filters Bar */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-slate-200 dark:border-white/10 mb-4 shadow-sm dark:shadow-none">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by user no. & other party no..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-400"
            />
          </div>
          
          <button className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-gray-200">
            Date Range
          </button>
          
          <button className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-gray-200">
            Review Date Range
          </button>
          
          <button
            onClick={() => setShowAdvancedFilters(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all font-semibold flex items-center gap-2 text-white"
          >
            <Filter size={16} />
            More Filters
          </button>
          
          <button className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center gap-2 text-slate-700 dark:text-gray-200">
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Advanced Filters</h2>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-500 dark:text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Quick Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-gray-300 mb-3">Quick Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries({
                    today: 'Today',
                    yesterday: 'Yesterday',
                    last7Days: 'Last 7 Days',
                    thisMonth: 'This Month',
                    uploaded: 'Uploaded',
                    transcribed: 'Transcribed',
                    rated: 'Rated',
                    commented: 'Commented',
                    notCommented: 'Not Commented',
                    conversionCalls: 'Conversion Calls',
                    nonCompliant: 'Non-Compliant',
                    horizon: 'Horizon',
                    xBees: 'X-Bees',
                  }).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => toggleQuickFilter(key)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        quickFilters[key]
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dropdown Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <select className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                  <option>Select User</option>
                  <option>Nazmul Chowdhur</option>
                  <option>Angeline Packy</option>
                  <option>Omar El Harcha</option>
                </select>

                <select className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                  <option>Select Branch</option>
                  <option>Barnet</option>
                  <option>Watford</option>
                  <option>Mega</option>
                </select>

                <select className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                  <option>Select Commented By</option>
                </select>

                <select className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                  <option>Rating Completed</option>
                </select>

                <select className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                  <option>Conversion Calls</option>
                </select>

                <select className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                  <option>Compliance Calls</option>
                </select>

                <select className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                  <option>Department</option>
                  <option>Sales</option>
                  <option>Call Center - Sales</option>
                  <option>Buying</option>
                </select>

                <select className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                  <option>Call Type</option>
                </select>

                <select className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                  <option>Recording Source</option>
                </select>

                <select className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                  <option>Platform</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between sticky bottom-0 bg-white dark:bg-slate-900">
              <button className="px-6 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-gray-200">
                Clear Filters
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 dark:text-gray-400">Total Record Found: 7006</span>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all font-semibold text-white"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
