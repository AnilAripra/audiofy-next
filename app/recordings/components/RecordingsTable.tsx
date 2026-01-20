import React from 'react';
import { Phone, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Recording {
  id: number;
  userName: string;
  department: string;
  userNo: string;
  otherParty: string;
  duration: string;
  connectTime: string;
  callType: string;
  callStatus: string;
  statusBg: string;
  platform: string;
  branch: string;
  conversion: string;
  compliance: string;
  average: string;
  comments: string;
  recordingSource: string;
  updatedAt: string;
  audioUrl: string;
  transcript: any[];
  scores: any[];
  totalWords: number;
  wordsChanged: number;
  accuracy: string;
  callSummary: string;
}

interface RecordingsTableProps {
  recordings: Recording[];
  onSelectRecording: (recording: Recording) => void;
}

export default function RecordingsTable({ recordings, onSelectRecording }: RecordingsTableProps) {
  return (
    <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-gradient-to-r dark:from-slate-800/50 dark:to-slate-900/50 border-b border-slate-200 dark:border-white/10">
            <tr>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">User Name</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Department</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">User No.</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Other Party No.</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Duration</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Connect Time</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Call Type</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Call Status</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Platform</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Branch</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Conversion</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Compliance</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Average</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((record) => (
              <tr
                key={record.id}
                onClick={() => onSelectRecording(record)}
                className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer text-slate-700 dark:text-gray-200"
              >
                <td className="py-3 px-3 font-medium">{record.userName}</td>
                <td className="py-3 px-3 text-slate-500 dark:text-gray-300">{record.department}</td>
                <td className="py-3 px-3 text-slate-500 dark:text-gray-400 font-mono text-xs">{record.userNo}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-orange-500 dark:text-orange-400" />
                    <span className="font-mono text-xs">{record.otherParty}</span>
                  </div>
                </td>
                <td className="py-3 px-3">{record.duration}</td>
                <td className="py-3 px-3 text-slate-500 dark:text-gray-400 text-xs">{record.connectTime}</td>
                <td className="py-3 px-3">{record.callType}</td>
                <td className="py-3 px-3">
                  <div className="flex flex-col gap-1">
                    <span className={`px-2 py-1 rounded text-xs font-semibold text-center ${
                      record.callStatus === 'OUT' 
                        ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400' 
                        : 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
                    }`}>
                      {record.callStatus}
                    </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded text-xs font-semibold text-center">
                      {record.statusBg}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded text-xs font-semibold">
                    {record.platform}
                  </span>
                </td>
                <td className="py-3 px-3">{record.branch}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    record.conversion === 'Yes' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' :
                    record.conversion === 'No' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400' :
                    'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400'
                  }`}>
                    {record.conversion}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    record.compliance === 'Yes' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' :
                    record.compliance === 'No' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400' :
                    'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400'
                  }`}>
                    {record.compliance}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className={`font-bold ${
                    parseFloat(record.average) >= 70 ? 'text-green-600 dark:text-green-400' :
                    parseFloat(record.average) >= 50 ? 'text-orange-600 dark:text-orange-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {record.average}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <button className="p-2 hover:bg-orange-500/10 dark:hover:bg-orange-500/20 rounded-lg transition-colors">
                    <PlayCircle size={18} className="text-orange-500 dark:text-orange-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-transparent">
        <div className="text-sm text-slate-500 dark:text-gray-400">
          1 to 25 of 7,006 Calls
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 dark:text-gray-400">Page 01 of 281</span>
          <div className="flex gap-2">
            <button className="p-2 bg-orange-500/10 dark:bg-orange-500/20 text-orange-500 dark:text-orange-400 rounded-lg hover:bg-orange-500/20 dark:hover:bg-orange-500/30 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 bg-orange-500/10 dark:bg-orange-500/20 text-orange-500 dark:text-orange-400 rounded-lg hover:bg-orange-500/20 dark:hover:bg-orange-500/30 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
          <select className="px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-700 dark:text-gray-200 focus:outline-none">
            <option>25 Rows</option>
            <option>50 Rows</option>
            <option>100 Rows</option>
          </select>
        </div>
      </div>
    </div>
  );
}
