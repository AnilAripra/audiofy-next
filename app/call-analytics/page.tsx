"use client";

import React, { useState, useMemo } from "react";
import DashboardLayout from "../_components/DashboardLayout";
import {
  Filter,
  Download,
  Target,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  PlayCircle,
  X,
  Search,
  Phone,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";

export default function CallAnalyticsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState(
    "Call Center - Sales",
  );
  const [dateFilter, setDateFilter] = useState("This Month");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filterMinCalls, setFilterMinCalls] = useState(0);
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);


  const leaderboardData = [
    {
      rank: 1,
      name: "Jamie Taylor",
      role: "User",
      calls: 2,
      avgTime: "00:02",
      conversion: "0%",
      qualityScore: "83%",
      pose: null,
      avatar: "JT",
    },
    {
      rank: 2,
      name: "Shuahib Miah",
      role: "User",
      calls: 460,
      avgTime: "21:28",
      conversion: "44%",
      qualityScore: "53%",
      pose: 1,
      poseDir: "up",
      avatar: "SM",
    },
    {
      rank: 3,
      name: "Mohammed Malik",
      role: "User",
      calls: 340,
      avgTime: "12:21",
      conversion: "34%",
      qualityScore: "50%",
      pose: 1,
      poseDir: "up",
      avatar: "MM",
    },
    {
      rank: 4,
      name: "Nadeem Ahmed",
      role: "User",
      calls: 267,
      avgTime: "09:21",
      conversion: "41%",
      qualityScore: "50%",
      pose: 1,
      poseDir: "up",
      avatar: "NA",
      highlight: true,
    },
    {
      rank: 5,
      name: "Sak Mohamed",
      role: "User",
      calls: 527,
      avgTime: "14:34",
      conversion: "38%",
      qualityScore: "48%",
      pose: 1,
      poseDir: "up",
      avatar: "SM",
    },
    {
      rank: 6,
      name: "Omar El Harchaoui",
      role: "User",
      calls: 309,
      avgTime: "14:04",
      conversion: "30%",
      qualityScore: "48%",
      pose: 4,
      poseDir: "down",
      avatar: "OH",
    },
    {
      rank: 7,
      name: "Asif Hussain",
      role: "Manager",
      calls: 52,
      avgTime: "01:43",
      conversion: "18%",
      qualityScore: "47%",
      pose: 1,
      poseDir: "up",
      avatar: "AH",
    },
    {
      rank: 8,
      name: "Haris Bajwa",
      role: "User",
      calls: 420,
      avgTime: "13:56",
      conversion: "42%",
      qualityScore: "45%",
      pose: 1,
      poseDir: "down",
      avatar: "HB",
    },
    {
      rank: 9,
      name: "Suhab Ahmed",
      role: "User",
      calls: 284,
      avgTime: "13:22",
      conversion: "26%",
      qualityScore: "43%",
      pose: null,
      avatar: "SA",
    },
    {
      rank: 10,
      name: "Anush Makwana",
      role: "User",
      calls: 71,
      avgTime: "01:35",
      conversion: "32%",
      qualityScore: "37%",
      pose: 1,
      poseDir: "down",
      avatar: "AM",
    },
  ];

  const callTypesData = [
    {
      name: "Inbound Sales Enquiry",
      conversionRate: "45%",
      calls: 66,
      qualityScore: "49.46%",
      color: "bg-blue-500",
    },
    {
      name: "Creating Urgency",
      conversionRate: null,
      calls: null,
      score: "2/5",
      color: "bg-green-500",
    },
    {
      name: "Handling Objections",
      conversionRate: null,
      calls: null,
      score: "1.5/5",
      color: "bg-purple-500",
    },
    {
      name: "Appointment / Deposit Close",
      conversionRate: null,
      calls: null,
      score: "2/5",
      color: "bg-orange-500",
    },
    {
      name: "Qualification",
      conversionRate: null,
      calls: null,
      score: "2.5/5",
      color: "bg-pink-500",
    },
    {
      name: "Engagement & Rapport",
      conversionRate: null,
      calls: null,
      score: "1.5/5",
      color: "bg-yellow-500",
    },
    {
      name: "Greeting & Intro",
      conversionRate: null,
      calls: null,
      score: "1.5/5",
      color: "bg-cyan-500",
    },
    {
      name: "Outbound Sales Lead",
      conversionRate: "42%",
      calls: 52,
      qualityScore: "43.48%",
      color: "bg-red-500",
    },
    {
      name: "Customer Appointment Confirmation Call",
      conversionRate: null,
      calls: 31,
      qualityScore: "65.38%",
      color: "bg-indigo-500",
    },
    {
      name: "Internal Call Transfer",
      conversionRate: null,
      calls: 27,
      qualityScore: "76.68%",
      color: "bg-teal-500",
    },
    {
      name: "Post-Sale General Enquiry",
      conversionRate: null,
      calls: 26,
      qualityScore: "44.84%",
      color: "bg-lime-500",
    },
  ];

  const userCallHistory = [
    {
      date: "18/01/2026",
      duration: "8:08 min",
      score: "84%",
      conversion: "Yes",
      scoreColor: "green",
      user: "Nadeem Ahmed",
    },
    {
      date: "13/01/2026",
      duration: "23:11 min",
      score: "73%",
      conversion: "Yes",
      scoreColor: "green",
      user: "Shuahib Miah",
    },
    {
      date: "12/01/2026",
      duration: "12:16 min",
      score: "70%",
      conversion: "Yes",
      scoreColor: "green",
      user: "Mohammed Malik",
    },
    {
      date: "18/01/2026",
      duration: "4:33 min",
      score: "68%",
      conversion: "Yes",
      scoreColor: "orange",
      user: "Sak Mohamed",
    },
    {
      date: "17/01/2026",
      duration: "9:19 min",
      score: "67%",
      conversion: "Yes",
      scoreColor: "orange",
      user: "Omar El Harchaoui",
    },
    {
      date: "17/01/2026",
      duration: "4:12 min",
      score: "67%",
      conversion: "Yes",
      scoreColor: "orange",
      user: "Nadeem Ahmed",
    },
    {
      date: "17/01/2026",
      duration: "3:31 min",
      score: "64%",
      conversion: "No",
      scoreColor: "orange",
      user: "Haris Bajwa",
    },
  ];

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredLeaderboard = useMemo(() => {
    let data = [...leaderboardData];

    // Filter by Min Calls
    if (filterMinCalls > 0) {
      data = data.filter((agent) => agent.calls >= filterMinCalls);
    }

    // Filter by Min Quality Score
    if (filterMinScore > 0) {
      data = data.filter((agent) => {
        const score = parseInt(agent.qualityScore.replace("%", ""));
        return score >= filterMinScore;
      });
    }

    // Sort
    if (sortConfig) {
      data.sort((a, b) => {
        let aValue: any = a[sortConfig.key as keyof typeof a];
        let bValue: any = b[sortConfig.key as keyof typeof b];

        // Handle percentage strings
        if (typeof aValue === "string" && aValue.includes("%")) {
          aValue = parseFloat(aValue.replace("%", ""));
          bValue = parseFloat(bValue.replace("%", ""));
        }

        // Handle time strings (00:00)
        if (typeof aValue === "string" && aValue.includes(":")) {
          const [aMin, aSec] = aValue.split(":").map(Number);
          const [bMin, bSec] = bValue.split(":").map(Number);
          aValue = aMin * 60 + aSec;
          bValue = bMin * 60 + bSec;
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [leaderboardData, filterMinCalls, filterMinScore, sortConfig]);

  const filteredHistory = useMemo(() => {
    if (!selectedAgent) return userCallHistory;
    return userCallHistory.filter((call) => call.user === selectedAgent);
  }, [userCallHistory, selectedAgent]);

  // Sort icon helper
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown size={12} className="text-gray-500" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={12} className="text-orange-600 dark:text-orange-400" />
    ) : (
      <ArrowDown size={12} className="text-orange-600 dark:text-orange-400" />
    );
  };

  return (
    <DashboardLayout title="Call Analytics">
      <div className="space-y-6">
        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-full sm:w-auto sm:min-w-[200px] theme-input"
              >
                <option>Call Center - Sales</option>
                <option>Call Center - Support</option>
                <option>Sales Department</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-full sm:w-auto sm:min-w-[150px] theme-input"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 7 Days</option>
                <option>Today</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className={`flex-1 sm:flex-none justify-center px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm border theme-input ${showMoreFilters ? "bg-orange-500/20 border-orange-500/50 text-orange-600 dark:text-orange-400" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
            >
              <Filter size={16} />
              <span>More Filters</span>
            </button>
            <button
              className="flex-1 sm:flex-none justify-center px-3 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 transition-all text-sm text-white"
              style={{ color: "#ffffff" }}
            >
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Extended Filters Panel */}
        {showMoreFilters && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 theme-panel animate-in slide-in-from-top-2">
            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-1.5 w-full sm:w-auto">
                <label className="text-xs text-gray-400">Min. Calls</label>
                <input
                  type="number"
                  value={filterMinCalls}
                  onChange={(e) => setFilterMinCalls(Number(e.target.value))}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-orange-500/50 theme-input"
                />
              </div>
              <div className="space-y-1.5 w-full sm:w-auto">
                <label className="text-xs text-gray-400">
                  Min. Quality Score (%)
                </label>
                <input
                  type="number"
                  value={filterMinScore}
                  onChange={(e) => setFilterMinScore(Number(e.target.value))}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-orange-500/50 theme-input"
                />
              </div>
              <button
                onClick={() => {
                  setFilterMinCalls(0);
                  setFilterMinScore(0);
                }}
                className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors w-full sm:w-auto text-center sm:text-left"
              >
                Reset
              </button>
            </div>
          </div>
        )}

     

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Leaderboard */}
          <div className="col-span-12 lg:col-span-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 theme-panel">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Call Center Leaderboard</h2>
                <p className="text-xs text-gray-400">
                  Top performing agents by quality score
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-gray-400 border-b border-white/10">
                    <th className="py-3 pl-4 font-medium">Rank</th>
                    <th className="py-3 font-medium">Agent</th>
                    <th
                      className="py-3 text-center font-medium cursor-pointer hover:text-white transition-colors group"
                      onClick={() => handleSort("calls")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Calls {getSortIcon("calls")}
                      </div>
                    </th>
                    <th
                      className="py-3 text-center font-medium cursor-pointer hover:text-white transition-colors group"
                      onClick={() => handleSort("avgTime")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Avg Time {getSortIcon("avgTime")}
                      </div>
                    </th>
                    <th
                      className="py-3 text-center font-medium cursor-pointer hover:text-white transition-colors group"
                      onClick={() => handleSort("conversion")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        Conversion {getSortIcon("conversion")}
                      </div>
                    </th>
                    <th
                      className="py-3 text-right pr-4 font-medium cursor-pointer hover:text-white transition-colors group"
                      onClick={() => handleSort("qualityScore")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Quality Score {getSortIcon("qualityScore")}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredLeaderboard.map((agent, index) => (
                    <tr
                      key={index}
                      onClick={() =>
                        setSelectedAgent(
                          agent.name === selectedAgent ? null : agent.name,
                        )
                      }
                      className={`border-b border-white/5 transition-colors cursor-pointer ${
                        selectedAgent === agent.name
                          ? "bg-orange-500/10 border-l-2 border-l-orange-500"
                          : agent.highlight
                            ? "bg-white/5 hover:bg-white/10"
                            : "hover:bg-white/5"
                      }`}
                    >
                      <td className="py-3 pl-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                              agent.rank <= 3
                                ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-500"
                                : "text-gray-600 dark:text-gray-500"
                            }`}
                          >
                            {agent.rank}
                          </span>
                          {agent.pose && (
                            <span
                              className={
                                agent.poseDir === "up"
                                  ? "text-green-600 dark:text-green-500"
                                  : "text-red-600 dark:text-red-500"
                              }
                            >
                              {agent.poseDir === "up" ? (
                                <ArrowUp size={12} />
                              ) : (
                                <ArrowDown size={12} />
                              )}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            {agent.avatar}
                          </div>
                          <div>
                            <div
                              className={`font-medium ${selectedAgent === agent.name ? "text-orange-600 dark:text-orange-400" : ""}`}
                            >
                              {agent.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {agent.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-center font-mono text-gray-600 dark:text-gray-300">
                        {agent.calls}
                      </td>
                      <td className="py-3 text-center font-mono text-gray-600 dark:text-gray-300">
                        {agent.avgTime}
                      </td>
                      <td className="py-3 text-center font-mono text-gray-600 dark:text-gray-300">
                        {agent.conversion}
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <div className="inline-block px-2 py-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold border border-green-500/20">
                          {agent.qualityScore}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Call Types */}
          <div className="col-span-12 lg:col-span-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 theme-panel">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">
                Call Types{" "}
                {selectedAgent && (
                  <span className="text-orange-600 dark:text-orange-400 text-sm block font-normal">
                    for {selectedAgent}
                  </span>
                )}
              </h2>
              <Target size={18} className="text-blue-600 dark:text-blue-400" />
            </div>

            <div className="space-y-4">
              {callTypesData.map((type, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-sm font-medium truncate pr-4"
                      title={type.name}
                    >
                      {type.name}
                    </span>
                    <span
                      className={`text-xs font-bold ${type.qualityScore ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}
                    >
                      {type.qualityScore || type.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${type.color || "bg-slate-500"}`}
                        style={{ width: type.conversionRate || "0%" }}
                      ></div>
                    </div>
                    {type.conversionRate && (
                      <span className="text-[10px] text-gray-400 w-8 text-right">
                        {type.conversionRate}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Calls History */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 theme-panel">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">
              Recent Call History{" "}
              {selectedAgent && (
                <span className="text-orange-600 dark:text-orange-400 text-sm font-normal">
                  - {selectedAgent}
                </span>
              )}
            </h2>
            <div className="flex gap-2">
              {selectedAgent && (
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded"
                >
                  <X size={12} /> Clear Filter
                </button>
              )}
              <button className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 transition-colors">
                View All <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-white/10">
                  <th className="py-3 pl-4 font-medium">Date</th>
                  <th className="py-3 font-medium">User</th>
                  <th className="py-3 font-medium">Duration</th>
                  <th className="py-3 font-medium">Conversion</th>
                  <th className="py-3 text-right pr-4 font-medium">Score</th>
                  <th className="py-3 text-right pr-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((call, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 pl-4 text-gray-600 dark:text-gray-300">{call.date}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-300">{call.user}</td>
                      <td className="py-3 font-mono text-gray-600 dark:text-gray-300">
                        {call.duration}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            call.conversion === "Yes"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {call.conversion}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <span
                          className={`font-bold ${
                            call.scoreColor === "green"
                              ? "text-green-600 dark:text-green-400"
                              : "text-orange-600 dark:text-orange-400"
                          }`}
                        >
                          {call.score}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-blue-600 dark:text-blue-400">
                          <PlayCircle size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      No call history found for this user.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
