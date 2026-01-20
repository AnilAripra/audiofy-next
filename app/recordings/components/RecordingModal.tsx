import React, { useState, useRef, useEffect } from 'react';
import { 
  Building, Phone, Clock, Maximize2, Minimize2, Download, Share2, X, 
  SkipBack, Pause, PlayCircle, SkipForward, Volume2, MessageSquare, Edit2, 
  ThumbsUp, AlertCircle, Star 
} from 'lucide-react';

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

interface RecordingModalProps {
  selectedRecording: Recording;
  onClose: () => void;
}

export default function RecordingModal({ selectedRecording, onClose }: RecordingModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Default, should be parsed from recording
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeTranscriptTab, setActiveTranscriptTab] = useState('transcript');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const waveformRef = useRef<HTMLDivElement>(null);

  // Initialize duration from recording string (e.g., "0:56")
  useEffect(() => {
    if (selectedRecording) {
      const parts = selectedRecording.duration.split(':');
      const minutes = parseInt(parts[0]);
      const seconds = parseInt(parts[1]);
      setDuration(minutes * 60 + seconds);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [selectedRecording]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(Math.floor(percentage * duration));
  };

  const getCurrentTranscript = () => {
    if (!selectedRecording) return null;
    return selectedRecording.transcript.find((t: any) => {
      const timeParts = t.time.split(':');
      const endTimeParts = t.endTime.split(':');
      const time = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
      const endTime = parseInt(endTimeParts[0]) * 60 + parseInt(endTimeParts[1]);
      return currentTime >= time && currentTime <= endTime;
    });
  };

  const currentTranscript = getCurrentTranscript();

  return (
    <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isFullscreen ? 'p-0' : ''}`}>
      <div className={`bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 rounded-xl border border-slate-200 dark:border-white/20 w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl ${isFullscreen ? 'h-screen max-h-screen rounded-none' : 'max-w-[95vw]'}`}>
        
        {/* Compact Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg text-white">
              {selectedRecording.userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedRecording.userName}</h2>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-gray-400 mt-1">
                <span className="flex items-center gap-1">
                  <Building size={14} />
                  {selectedRecording.department}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={14} />
                  {selectedRecording.otherParty}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {selectedRecording.connectTime}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-white/5 rounded-lg">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                selectedRecording.callStatus === 'OUT' 
                  ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400' 
                  : 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
              }`}>
                {selectedRecording.callStatus}
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded text-xs font-semibold">
                {selectedRecording.platform}
              </span>
              <span className="text-sm text-slate-500 dark:text-gray-400">{selectedRecording.callType}</span>
            </div>
            
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-600 dark:text-gray-300"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-600 dark:text-gray-300">
              <Download size={18} />
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-600 dark:text-gray-300">
              <Share2 size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-600 dark:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-white dark:bg-transparent">
          
          {/* Left Side - Audio & Transcript */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Audio Player Section */}
            <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-800/30 dark:to-transparent">
              
              {/* Waveform */}
              <div 
                ref={waveformRef}
                onClick={handleSeek}
                className="relative h-32 bg-slate-200 dark:bg-slate-900/80 rounded-xl overflow-hidden cursor-pointer mb-4 border border-slate-300 dark:border-white/10"
              >
                <div className="absolute inset-0 flex items-center px-2">
                  {Array.from({ length: 150 }).map((_, i) => {
                    const progress = (currentTime / duration) * 150;
                    const isPassed = i < progress;
                    return (
                      <div
                        key={i}
                        className={`flex-1 mx-px rounded-full transition-all duration-100 ${
                          isPassed 
                            ? 'bg-gradient-to-t from-orange-500 to-pink-500 opacity-90' 
                            : 'bg-slate-400 dark:bg-gradient-to-t dark:from-gray-600 dark:to-gray-500 opacity-40'
                        }`}
                        style={{
                          height: `${20 + Math.abs(Math.sin(i * 0.2) * 70)}%`,
                        }}
                      />
                    );
                  })}
                </div>
                
                {/* Current Time Indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-orange-500 dark:bg-orange-400 shadow-lg shadow-orange-500/50"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 dark:bg-orange-400 rounded-full shadow-lg shadow-orange-500/50" />
                </div>

                {/* Current Transcript Overlay */}
                {currentTranscript && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-4 py-2 rounded-lg border border-orange-500/30 max-w-md shadow-lg">
                    <div className="text-xs text-orange-600 dark:text-orange-400 font-semibold mb-1">{currentTranscript.speaker}</div>
                    <div className="text-sm text-slate-800 dark:text-gray-200">{currentTranscript.text}</div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-600 dark:text-gray-300"
                  >
                    <SkipBack size={20} />
                  </button>
                  
                  <button
                    onClick={togglePlay}
                    className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all text-white"
                  >
                    {isPlaying ? <Pause size={24} /> : <PlayCircle size={24} />}
                  </button>
                  
                  <button
                    onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-600 dark:text-gray-300"
                  >
                    <SkipForward size={20} />
                  </button>

                  <div className="flex items-center gap-2 ml-4">
                    <Volume2 size={18} className="text-slate-500 dark:text-gray-400" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-24 accent-orange-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 dark:text-gray-400">Speed:</span>
                    {[0.5, 1, 1.5, 2].map(speed => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackRate(speed)}
                        className={`px-3 py-1 rounded-lg text-sm transition-all ${
                          playbackRate === speed
                            ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/10'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                  
                  <div className="text-sm font-mono">
                    <span className="text-orange-600 dark:text-orange-400">{formatTime(currentTime)}</span>
                    <span className="text-slate-400 dark:text-gray-600 mx-1">/</span>
                    <span className="text-slate-500 dark:text-gray-400">{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 px-6 pt-4 border-b border-slate-200 dark:border-white/10">
              {['transcript', 'summary', 'insights'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTranscriptTab(tab)}
                  className={`px-4 py-2 rounded-t-lg transition-all capitalize ${
                    activeTranscriptTab === tab
                      ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white border-t-2 border-orange-500'
                      : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Transcript Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-transparent">
              {activeTranscriptTab === 'transcript' && (
                <div className="space-y-4">
                  {selectedRecording.transcript.map((item: any, index: number) => {
                    const itemTime = parseInt(item.time.split(':')[0]) * 60 + parseInt(item.time.split(':')[1]);
                    const itemEndTime = parseInt(item.endTime.split(':')[0]) * 60 + parseInt(item.endTime.split(':')[1]);
                    const isActive = currentTime >= itemTime && currentTime <= itemEndTime;
                    
                    return (
                      <div 
                        key={index}
                        onClick={() => setCurrentTime(itemTime)}
                        className={`flex gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 shadow-md dark:shadow-lg' 
                            : 'bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          item.speaker === 'Agent' 
                            ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30' 
                            : 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30'
                        }`}>
                          {item.speaker === 'Agent' ? 'A' : 'C'}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.speaker}</span>
                            <span className="text-xs text-slate-500 dark:text-gray-400 font-mono">{item.time} - {item.endTime}</span>
                            {item.sentiment && (
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                item.sentiment === 'positive' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' :
                                item.sentiment === 'negative' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400' :
                                'bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400'
                              }`}>
                                {item.sentiment}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-700 dark:text-gray-200 leading-relaxed">{item.text}</p>
                          <button className="mt-2 text-xs text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 flex items-center gap-1">
                            <Edit2 size={12} />
                            Edit
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTranscriptTab === 'summary' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 dark:from-blue-500/10 to-purple-50 dark:to-purple-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
                      <MessageSquare size={20} className="text-blue-500 dark:text-blue-400" />
                      Call Summary
                    </h3>
                    <p className="text-slate-700 dark:text-gray-300 leading-relaxed">{selectedRecording.callSummary}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
                      <div className="text-sm text-slate-500 dark:text-gray-400 mb-1">Call Duration</div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedRecording.duration}</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
                      <div className="text-sm text-slate-500 dark:text-gray-400 mb-1">Total Words</div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedRecording.totalWords}</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
                      <div className="text-sm text-slate-500 dark:text-gray-400 mb-1">Accuracy</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedRecording.accuracy}</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
                      <div className="text-sm text-slate-500 dark:text-gray-400 mb-1">Quality Score</div>
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{selectedRecording.average}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTranscriptTab === 'insights' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-orange-50 dark:from-orange-500/10 to-pink-50 dark:to-pink-500/10 border border-orange-100 dark:border-orange-500/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Key Insights</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <ThumbsUp size={18} className="text-green-600 dark:text-green-400 mt-0.5" />
                        <div>
                          <div className="font-semibold text-green-600 dark:text-green-400 mb-1">Positive Aspects</div>
                          <p className="text-sm text-slate-700 dark:text-gray-300">Professional greeting and clear communication throughout the call.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle size={18} className="text-orange-600 dark:text-orange-400 mt-0.5" />
                        <div>
                          <div className="font-semibold text-orange-600 dark:text-orange-400 mb-1">Areas for Improvement</div>
                          <p className="text-sm text-slate-700 dark:text-gray-300">Could have provided more proactive information to the customer.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
                    <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Conversation Flow</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-600 dark:text-gray-300">Opening: Professional</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-slate-600 dark:text-gray-300">Middle: Efficient</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-600 dark:text-gray-300">Closing: Satisfactory</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Scoring & Rating */}
          <div className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/10 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900/30">
            
            {/* Score Header */}
            <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-orange-500/5 to-pink-500/5 dark:from-orange-500/10 dark:to-pink-500/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-slate-500 dark:text-gray-400 mb-1">Overall Quality Score</div>
                  <div className={`text-4xl font-bold ${
                    parseFloat(selectedRecording.average) >= 70 ? 'text-green-600 dark:text-green-400' :
                    parseFloat(selectedRecording.average) >= 50 ? 'text-orange-600 dark:text-orange-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {selectedRecording.average}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 dark:text-gray-400 mb-2">Compliance</div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      selectedRecording.conversion === 'Yes' 
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                    }`}>
                      Conv: {selectedRecording.conversion}
                    </span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      selectedRecording.compliance === 'Yes' 
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' 
                        : selectedRecording.compliance === 'No'
                        ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400'
                    }`}>
                      Comp: {selectedRecording.compliance}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-400 dark:text-gray-500">
                Review based on Gemini - 20/01/24 7:03 am
              </div>
            </div>

            {/* Scoring Criteria */}
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-4 uppercase tracking-wide">Evaluation Criteria</h3>
              
              <div className="space-y-4">
                {selectedRecording.scores.map((score: any, index: number) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 hover:border-orange-500/30 transition-all shadow-sm dark:shadow-none"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold mb-1 text-slate-900 dark:text-white">{score.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-gray-400">{score.feedback}</p>
                      </div>
                      <button className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 ml-2">
                        Review
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {Array.from({ length: score.outOf }).map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={`transition-all ${
                              i < (score.rating === 'N/A' ? 0 : score.rating)
                                ? `fill-${score.color}-500 dark:fill-${score.color}-400 text-${score.color}-500 dark:text-${score.color}-400`
                                : 'text-slate-300 dark:text-gray-700'
                            }`}
                            style={{
                              fill: i < (score.rating === 'N/A' ? 0 : score.rating) ? 'currentColor' : 'none'
                            }}
                          />
                        ))}
                      </div>
                      <span className={`text-sm font-bold ${
                        score.rating === 'N/A' 
                          ? 'text-slate-400 dark:text-gray-400' 
                          : score.color === 'green' ? 'text-green-600 dark:text-green-400' :
                            score.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                            score.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                            score.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                            'text-gray-600 dark:text-gray-400'
                      }`}>
                        {score.rating === 'N/A' ? 'N/A' : `${score.rating}/${score.outOf}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transcription Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-4 uppercase tracking-wide">Transcription Quality</h3>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 dark:from-blue-500/10 to-blue-100 dark:to-blue-600/10 rounded-lg p-3 text-center border border-blue-200 dark:border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedRecording.totalWords}</div>
                    <div className="text-xs text-slate-500 dark:text-gray-400 mt-1">Total Words</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 dark:from-orange-500/10 to-orange-100 dark:to-orange-600/10 rounded-lg p-3 text-center border border-orange-200 dark:border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{selectedRecording.wordsChanged}</div>
                    <div className="text-xs text-slate-500 dark:text-gray-400 mt-1">Edited</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 dark:from-green-500/10 to-green-100 dark:to-green-600/10 rounded-lg p-3 text-center border border-green-200 dark:border-green-500/20">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedRecording.accuracy}</div>
                    <div className="text-xs text-slate-500 dark:text-gray-400 mt-1">Accuracy</div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-4 uppercase tracking-wide">Add Your Review</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 dark:text-gray-400 mb-2 block">Suggest Rating *</label>
                    <select className="w-full px-3 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200">
                      <option>Select rating...</option>
                      <option>⭐ 1 - Poor</option>
                      <option>⭐⭐ 2 - Below Average</option>
                      <option>⭐⭐⭐ 3 - Average</option>
                      <option>⭐⭐⭐⭐ 4 - Good</option>
                      <option>⭐⭐⭐⭐⭐ 5 - Excellent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-xs text-slate-500 dark:text-gray-400 mb-2 block">Add Comments *</label>
                    <textarea
                      className="w-full px-3 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-700 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-400"
                      rows={4}
                      placeholder="Share your feedback about this call..."
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <button className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 transition-colors">
                      View all comments →
                    </button>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all font-semibold text-white">
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
