"use client";

import React, { useState } from "react";
import DashboardLayout from "../_components/DashboardLayout";
import { Search, Activity, PlayCircle, Settings, Users } from "lucide-react";

const allAgents = [
  { id: 1, name: 'Ahmad Safaye', username: 'a.safaye@car-planet.co.uk', branch: 'Barnet', department: 'Sales', status: 'online' },
  { id: 2, name: 'Car Planet Accounts', username: 'invoice@car-planet.co.uk', branch: 'Barnet', department: 'Sales', status: 'online' },
  { id: 3, name: 'Muanis Ramaxhiku', username: 'muanis@car-planet.co.uk', branch: 'Watford', department: 'Sales', status: 'online' },
  { id: 4, name: 'Aaron Shabani', username: 'aaron.shabani@car-planet.co.uk', branch: 'Barnet', department: 'Sales', status: 'online' },
  { id: 5, name: 'Mohamed Eka', username: 'mohamed.eka@car-planet.co.uk', branch: 'Watford', department: 'Sales', status: 'online' },
  { id: 6, name: 'Dinosh Sinnathamby', username: 'dinosh@car-planet.co.uk', branch: 'Watford', department: 'Sales', status: 'online' },
  { id: 7, name: 'Salman Khan', username: 'salman@car-planet.co.uk', branch: 'Watford', department: 'Sales', status: 'online' },
  { id: 8, name: 'Sean Vignales', username: 'Sean@car-planet.co.uk', branch: 'Barnet', department: 'Sales', status: 'online' },
  { id: 9, name: 'Tabish Ahmad', username: 'tabish@car-planet.co.uk', branch: 'Barnet', department: 'Sales', status: 'online' },
  { id: 10, name: 'Muhamamd Quddus', username: 'm.quddus@car-planet.co.uk', branch: 'Mega', department: 'Parts', status: 'online' },
  { id: 11, name: 'Xhesika Dedgjonaj', username: 'xhesika@car-planet.co.uk', branch: 'Barnet', department: 'Sales', status: 'online' },
  { id: 12, name: 'Mashrur Rahman', username: 'mashrur@car-planet.co.uk', branch: 'Mega', department: 'Aftersales', status: 'online' },
  { id: 13, name: 'Mohammed Malik', username: 'mohammed.malik@car-planet.co.uk', branch: 'Mega', department: 'Call Center', status: 'online' },
  { id: 14, name: 'Andrew Kettenis', username: 'andrew@car-planet.co.uk', branch: 'Mega', department: 'Sales', status: 'offline' },
  { id: 15, name: 'Brandon Gubbins', username: 'brandon@car-planet.co.uk', branch: 'Watford', department: 'Sales', status: 'offline' },
  { id: 16, name: 'Zain Beg', username: 'zain@car-planet.co.uk', branch: 'Barnet', department: 'Buying', status: 'offline' },
];

export default function LiveStreamPage() {
  const [searchAgent, setSearchAgent] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [streamingAgents, setStreamingAgents] = useState<Record<number, boolean>>({});

  const filteredAgents = allAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchAgent.toLowerCase()) || 
                         agent.username.toLowerCase().includes(searchAgent.toLowerCase());
    const matchesDept = filterDepartment === 'all' || agent.department === filterDepartment;
    const matchesBranch = filterBranch === 'all' || agent.branch === filterBranch;
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
    return matchesSearch && matchesDept && matchesBranch && matchesStatus;
  });

  const onlineCount = filteredAgents.filter(a => a.status === 'online').length;

  const toggleStreaming = (agentId: number) => {
    setStreamingAgents(prev => ({
      ...prev,
      [agentId]: !prev[agentId]
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 theme-panel">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by user name..." 
                value={searchAgent}
                onChange={(e) => setSearchAgent(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm theme-input"
              />
            </div>
            
            <select 
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm min-w-[160px] theme-input"
            >
              <option value="all">All Departments</option>
              <option value="Sales">Sales</option>
              <option value="Buying">Buying</option>
              <option value="Call Center">Call Center</option>
              <option value="Parts">Parts</option>
              <option value="Aftersales">Aftersales</option>
            </select>
            
            <select 
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm min-w-[140px] theme-input"
            >
              <option value="all">All Branches</option>
              <option value="Barnet">Barnet</option>
              <option value="Watford">Watford</option>
              <option value="Mega">Mega</option>
            </select>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm min-w-[120px] theme-input"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            
            <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <Activity size={18} className="text-blue-400" />
              <span className="text-sm font-semibold">
                Showing <span className="text-blue-400">{filteredAgents.length}</span> out of <span className="text-blue-400">{allAgents.length}</span> agents
              </span>
              <span className="text-xs text-gray-400 ml-2">
                ({onlineCount} online)
              </span>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAgents.map((agent) => (
            <div 
              key={agent.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all theme-panel"
            >
              <div className="flex items-start gap-3">
                {/* Play/Stop Button */}
                <button
                  onClick={() => toggleStreaming(agent.id)}
                  className={`p-3 rounded-lg transition-all ${
                    streamingAgents[agent.id]
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gradient-to-br from-orange-500 to-pink-500 hover:shadow-lg hover:shadow-orange-500/30'
                  }`}
                >
                  {streamingAgents[agent.id] ? (
                    <div className="w-3.5 h-3.5 bg-white rounded-sm"></div>
                  ) : (
                    <PlayCircle size={20} className="text-white" />
                  )}
                </button>

                {/* Agent Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${agent.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className={`text-xs font-semibold ${agent.status === 'online' ? 'text-green-400' : 'text-gray-400'}`}>
                      {streamingAgents[agent.id] ? 'Streaming' : agent.status === 'online' ? 'Not Streaming' : 'Offline'}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-sm mb-1">{agent.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">User-Name: {agent.username}</p>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-gray-400">Branch: </span>
                      <span className="text-blue-400 font-semibold">{agent.branch}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Department: </span>
                      <span className="text-blue-400 font-semibold">{agent.department}</span>
                    </div>
                  </div>
                </div>

                {/* Settings Icon */}
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Settings size={16} className="text-blue-400" />
                </button>
              </div>

              {/* Streaming Status Bar */}
              {streamingAgents[agent.id] && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-orange-500 rounded animate-pulse" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 h-4 bg-orange-500 rounded animate-pulse" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1 h-4 bg-orange-500 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
                        <div className="w-1 h-4 bg-orange-500 rounded animate-pulse" style={{ animationDelay: '450ms' }}></div>
                      </div>
                      <span className="text-xs text-orange-400 font-semibold">Live Audio</span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">00:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-12 border border-white/10 text-center theme-panel">
            <Users size={48} className="mx-auto mb-4 text-gray-600" />
            <h3 className="text-lg font-bold mb-2">No Agents Found</h3>
            <p className="text-sm text-gray-400">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}