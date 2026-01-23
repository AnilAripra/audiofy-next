import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Download, Upload, ChevronDown, ChevronRight } from 'lucide-react';
import { CallType } from '../../types';
import { departments } from '../../data';

interface CallTypeListProps {
  callTypes: CallType[];
  onSelectCallType: (callType: CallType) => void;
  onDeleteCallType: (id: number) => void;
  onAddNew: () => void;
}

export default function CallTypeList({ callTypes, onSelectCallType, onDeleteCallType, onAddNew }: CallTypeListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (id: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredCallTypes = callTypes.filter(ct => {
    const matchesSearch = ct.callType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDepartment ? ct.departments.includes(selectedDepartment) : true;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-4">
      {/* Filters & Actions */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by Call Type"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm"
          />
        </div>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-gray-300 [&>option]:bg-slate-900"
        >
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.name}>{dept.name}</option>
          ))}
        </select>

        <button
          onClick={onAddNew}
          className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all font-semibold flex items-center gap-2 text-white"
        >
          <Plus size={16} />
          Add New Call Type
        </button>

        <button className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors flex items-center gap-2 text-gray-300">
          <Upload size={16} />
          Import CSV
        </button>

        <button className="p-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
          <Download size={18} className="text-orange-400" />
        </button>
      </div>

      {/* Call Types Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-white/10">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-300 w-12"></th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-300">Call Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-300">Direction</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-300">Departments</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-300">Category</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-300">Weighting</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-300">Conversion</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-300">Scoring Guides</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCallTypes.map((callType) => (
                <React.Fragment key={callType.id}>
                  <tr className="border-b border-white/5 hover:bg-white/10 transition-colors">
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleRow(callType.id)}
                        className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400"
                      >
                        {expandedRows[callType.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                    </td>
                    <td className="py-3 px-4 font-medium text-white">{callType.callType}</td>
                    <td className="py-3 px-4 text-gray-300">{callType.direction}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap items-center gap-1">
                        {callType.departments.slice(0, 2).map((dept, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                            {dept}
                          </span>
                        ))}
                        {callType.departments.length > 2 && (
                          <span className="text-xs text-orange-400">+{callType.departments.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{callType.category}</td>
                    <td className="py-3 px-4 font-semibold text-white">{callType.weighting}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${callType.eligibleForConversion ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                        {callType.eligibleForConversion ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-semibold">{callType.scoringGuides.length}</span>
                        <span className="text-gray-500 text-xs">criteria</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectCallType(callType)}
                          className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                          title="View & Edit Details"
                        >
                          <Edit2 size={16} className="text-blue-400" />
                        </button>
                        <button 
                          onClick={() => onDeleteCallType(callType.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Row - Quick Preview */}
                  {expandedRows[callType.id] && (
                    <tr className="bg-slate-800/30">
                      <td colSpan={9} className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 mb-2">What to Listen For</h4>
                            <p className="text-sm text-gray-300 line-clamp-3">{callType.whatToListenFor}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 mb-2">Scoring Criteria</h4>
                            <div className="flex flex-wrap gap-2">
                              {callType.scoringGuides.map((guide) => (
                                <div
                                  key={guide.id}
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2"
                                  style={{ backgroundColor: guide.color + '20', color: guide.color }}
                                >
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: guide.color }}></div>
                                  {guide.categoryTitle}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => onSelectCallType(callType)}
                          className="mt-3 text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
                        >
                          View Full Details & Manage Scoring
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
