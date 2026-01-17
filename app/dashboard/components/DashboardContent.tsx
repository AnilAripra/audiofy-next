import React from "react";
import {
  BarChart3,
  Phone,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Zap,
  Award,
  Filter,
  Download,
  PlayCircle,
} from "lucide-react";

const stats = [
  {
    label: "Total Calls",
    value: "6,630",
    change: "-25.8%",
    isNegative: true,
    icon: Phone,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Average Score",
    value: "2.3",
    change: "+27.5%",
    isNegative: false,
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Avg Duration",
    value: "03 min",
    change: "+15.4%",
    isNegative: false,
    icon: Clock,
    color: "from-orange-500 to-red-500",
  },
  {
    label: "Total Duration",
    value: "367h 49m",
    change: "-14.4%",
    isNegative: true,
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
];

const topPerformers = [
  {
    name: "Brandon Gubbins",
    calls: 33,
    rating: "51.30%",
    avatar: "BG",
    trend: "up",
    score: 51,
  },
  {
    name: "Aaron Shabani",
    calls: 47,
    rating: "49.44%",
    avatar: "AS",
    trend: "up",
    score: 49,
  },
  {
    name: "Zain Beg",
    calls: 338,
    rating: "45.59%",
    avatar: "ZB",
    trend: "down",
    score: 45,
  },
  {
    name: "Chey Cancannon",
    calls: 78,
    rating: "37.73%",
    avatar: "CC",
    trend: "down",
    score: 37,
  },
];

const departments = [
  {
    name: "Buying",
    calls: 51,
    avgTime: "01:12",
    conversion: "0%",
    score: "57%",
    color: "blue",
  },
  {
    name: "Sales",
    calls: 82,
    avgTime: "02:20",
    conversion: "9%",
    score: "57%",
    color: "green",
  },
  {
    name: "Call Center",
    calls: 44,
    avgTime: "02:09",
    conversion: "53%",
    score: "51%",
    color: "purple",
  },
  {
    name: "Aftersales",
    calls: 10,
    avgTime: "00:55",
    conversion: "0%",
    score: "41%",
    color: "orange",
  },
];

const recentCalls = [
  {
    user: "Sean Vignales",
    dept: "Sales",
    duration: "0:55",
    score: "32%",
    status: "Completed",
    platform: "Cairoplanet",
    branch: "Barnet",
  },
  {
    user: "Brandon Gubbins",
    dept: "Sales",
    duration: "0:53",
    score: "45%",
    status: "Completed",
    platform: "Cairoplanet",
    branch: "Watford",
  },
  {
    user: "Nadeem Ahmed",
    dept: "Call Center",
    duration: "1:46",
    score: "76%",
    status: "Completed",
    platform: "Cairoplanet",
    branch: "Mega",
  },
  {
    user: "Zain Beg",
    dept: "Buying",
    duration: "0:49",
    score: "0%",
    status: "Completed",
    platform: "Caddadus",
    branch: "Mega",
  },
];

const liveAgents = [
  {
    name: "Aaron Shabani",
    status: "active",
    duration: "00:12:34",
    dept: "Sales",
  },
  {
    name: "Zane Hosseini",
    status: "active",
    duration: "00:08:45",
    dept: "Sales",
  },
  {
    name: "Nadeem Ahmed",
    status: "active",
    duration: "00:15:22",
    dept: "Call Center",
  },
  {
    name: "Tabish Ahmad",
    status: "idle",
    duration: "00:00:00",
    dept: "Sales",
  },
];

const callTypes = [
  { type: "Voicemail", count: 24, percentage: "38%", color: "bg-blue-500" },
  {
    type: "Buying Appointment",
    count: 20,
    percentage: "32%",
    color: "bg-green-500",
  },
  {
    type: "Customer Appointment",
    count: 12,
    percentage: "19%",
    color: "bg-purple-500",
  },
  {
    type: "Finance Proposal",
    count: 7,
    percentage: "11%",
    color: "bg-orange-500",
  },
];

export default function DashboardContent() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all overflow-hidden group"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
            ></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon size={18} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    stat.isNegative ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {stat.isNegative ? (
                    <TrendingDown size={14} />
                  ) : (
                    <TrendingUp size={14} />
                  )}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-400 text-xs mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-8 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Call Volume Trend</h2>
              <p className="text-xs text-gray-400">Hourly breakdown for today</p>
            </div>
            <select className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
            </select>
          </div>

          <div className="h-48 flex items-end gap-2">
            {[
              45, 62, 55, 78, 85, 92, 88, 95, 82, 75, 68, 58, 72, 85, 90, 88, 75,
              65, 55, 48, 42, 38, 35, 32,
            ].map((height, i) => (
              <div key={i} className="flex-1 h-full flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm hover:opacity-80 transition-opacity relative group"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {Math.floor(height * 1.5)} calls
                  </div>
                </div>
                {i % 4 === 0 && (
                  <span className="text-[10px] text-gray-500">{i}:00</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h2 className="text-lg font-bold mb-4">Call Types</h2>
          <div className="space-y-3">
            {callTypes.map((type, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{type.type}</span>
                  <span className="text-sm text-gray-400">{type.count}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${type.color} rounded-full transition-all`}
                      style={{ width: type.percentage }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 w-10 text-right">
                    {type.percentage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Top Performers</h2>
            <Award size={18} className="text-orange-400" />
          </div>

          <div className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-sm">
                  {performer.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">
                    {performer.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {performer.calls} calls
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-orange-400">
                    {performer.rating}
                  </div>
                  <div className="w-16 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                      style={{ width: `${performer.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-5 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Department Performance</h2>
            <Target size={18} className="text-blue-400" />
          </div>

          <div className="space-y-2.5">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{dept.name}</span>
                  <span className="text-xs text-gray-400">
                    {dept.calls} calls
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-gray-400">Avg Time</div>
                    <div className="font-semibold text-blue-400">
                      {dept.avgTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Conversion</div>
                    <div className="font-semibold text-green-400">
                      {dept.conversion}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Quality</div>
                    <div className="font-semibold text-orange-400">
                      {dept.score}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h2 className="text-lg font-bold mb-4">Recording Status</h2>

          <div className="space-y-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Horizon</h3>
                <Activity size={16} className="text-blue-400" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-gray-400">Total</div>
                  <div className="text-xl font-bold text-blue-400">9</div>
                </div>
                <div>
                  <div className="text-gray-400">Done</div>
                  <div className="text-xl font-bold text-green-400">9</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-lg border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Xbees</h3>
                <Zap size={16} className="text-orange-400" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-gray-400">Total</div>
                  <div className="text-lg font-bold text-orange-400">
                    11,006
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Valid</div>
                  <div className="text-lg font-bold text-green-400">6,932</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div>
                  <div className="text-gray-400">Short</div>
                  <div className="text-sm font-bold text-red-400">4,040</div>
                </div>
                <div>
                  <div className="text-gray-400">Invalid</div>
                  <div className="text-sm font-bold text-red-400">34</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Calls</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors text-sm">
                <Filter size={14} />
                Filter
              </button>
              <button className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 transition-all text-sm">
                <Download size={14} />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400">
                    Agent
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400">
                    Dept
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400">
                    Duration
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400">
                    Score
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400">
                    Platform
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400">
                    Branch
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentCalls.map((call, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-xs font-bold">
                          {call.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium text-sm">{call.user}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-400 text-xs">
                      {call.dept}
                    </td>
                    <td className="py-3 px-3 text-xs">{call.duration}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          parseInt(call.score) >= 70
                            ? "bg-green-500/20 text-green-400"
                            : parseInt(call.score) >= 50
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {call.score}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-gray-400">
                      {call.platform}
                    </td>
                    <td className="py-3 px-3 text-xs text-gray-400">
                      {call.branch}
                    </td>
                    <td className="py-3 px-3">
                      <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                        <PlayCircle size={16} className="text-orange-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Live Agents</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">29 Online</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {liveAgents.map((agent, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="relative">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-xs">
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
                      agent.status === "active"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-gray-400">{agent.dept}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-blue-400">
                    {agent.duration}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {agent.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
