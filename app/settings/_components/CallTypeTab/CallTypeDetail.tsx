import React, { useState } from 'react';
import { Edit2, Trash2, ChevronRight, Star, Plus, Save, ArrowLeft } from 'lucide-react';
import { CallType, ScoringGuide, ScoringGuideScore } from '../../types';

interface CallTypeDetailProps {
  callType: CallType;
  onSave: (updatedCallType: CallType) => void;
  onCancel: () => void;
}

export default function CallTypeDetail({ callType, onSave, onCancel }: CallTypeDetailProps) {
  const [formData, setFormData] = useState<CallType>(JSON.parse(JSON.stringify(callType)));

  const handleInputChange = (field: keyof CallType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addNewScoringGuide = () => {
    const newGuide: ScoringGuide = {
      id: Date.now(),
      order: formData.scoringGuides.length + 1,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      categoryTitle: '',
      categoryDescription: '',
      scores: [
        { level: 0, description: '' },
        { level: 1, description: '' },
        { level: 2, description: '' },
      ],
    };
    setFormData(prev => ({
      ...prev,
      scoringGuides: [...prev.scoringGuides, newGuide]
    }));
  };

  const updateScoringGuide = (id: number, field: keyof ScoringGuide, value: any) => {
    setFormData(prev => ({
      ...prev,
      scoringGuides: prev.scoringGuides.map(g => g.id === id ? { ...g, [field]: value } : g)
    }));
  };

  const deleteScoringGuide = (id: number) => {
    setFormData(prev => ({
      ...prev,
      scoringGuides: prev.scoringGuides.filter(g => g.id !== id)
    }));
  };

  const updateScore = (guideId: number, scoreIndex: number, description: string) => {
    setFormData(prev => ({
      ...prev,
      scoringGuides: prev.scoringGuides.map(g => {
        if (g.id !== guideId) return g;
        const newScores = [...g.scores];
        newScores[scoreIndex] = { ...newScores[scoreIndex], description };
        return { ...g, scores: newScores };
      })
    }));
  };

  const addScoreLevel = (guideId: number) => {
    setFormData(prev => ({
      ...prev,
      scoringGuides: prev.scoringGuides.map(g => {
        if (g.id !== guideId) return g;
        const nextLevel = g.scores.length;
        return {
          ...g,
          scores: [...g.scores, { level: nextLevel, description: '' }]
        };
      })
    }));
  };

  const deleteScoreLevel = (guideId: number, scoreIndex: number) => {
    setFormData(prev => ({
      ...prev,
      scoringGuides: prev.scoringGuides.map(g => {
        if (g.id !== guideId) return g;
        const newScores = g.scores.filter((_, idx) => idx !== scoreIndex);
        // Re-index levels
        const reindexedScores = newScores.map((s, idx) => ({ ...s, level: idx }));
        return { ...g, scores: reindexedScores };
      })
    }));
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Call Types
      </button>

      {/* Call Type Header */}
      <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">{formData.callType}</h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg font-medium">
                {formData.direction}
              </span>
              <span className="text-gray-400">Category: {formData.category}</span>
              <span className="text-gray-400">Weighting: <span className="font-bold text-white">{formData.weighting}</span></span>
            </div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Edit2 size={18} className="text-orange-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Departments</div>
            <div className="flex flex-wrap gap-1">
              {formData.departments.map((dept, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                  {dept}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Conversion Eligible</div>
            <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${formData.eligibleForConversion ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
              {formData.eligibleForConversion ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Scoring Criteria</div>
            <div className="text-2xl font-bold text-blue-400">{formData.scoringGuides.length}</div>
          </div>
        </div>
      </div>

      {/* Call Type Details */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">What to Listen For</h3>
          <textarea
            value={formData.whatToListenFor}
            onChange={(e) => handleInputChange('whatToListenFor', e.target.value)}
            className="w-full border-white/8 bg-transparent text-sm text-gray-300 leading-relaxed focus:outline-none focus:ring-1 focus:ring-orange-500/50 rounded p-2 border  hover:border-white/10"
            rows={3}
          />
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Conversion Definition</h3>
          <textarea
            value={formData.conversionDefinition}
            onChange={(e) => handleInputChange('conversionDefinition', e.target.value)}
            className="w-full border-white/8 bg-transparent text-sm text-gray-300 leading-relaxed focus:outline-none focus:ring-1 focus:ring-orange-500/50 rounded p-2 border  hover:border-white/10"
            rows={3}
          />
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Compliance Definition</h3>
          <textarea
            value={formData.complianceDefinition}
            onChange={(e) => handleInputChange('complianceDefinition', e.target.value)}
            className="w-full border-white/8 bg-transparent text-sm text-gray-300 leading-relaxed focus:outline-none focus:ring-1 focus:ring-orange-500/50 rounded p-2 border  hover:border-white/10"
            rows={3}
          />
        </div>
      </div>

      {/* Scoring Guides Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-slate-800/30 to-slate-900/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1 text-white">Scoring Criteria</h3>
              <p className="text-sm text-gray-400">Define how this call type will be evaluated</p>
            </div>
            <button
              onClick={addNewScoringGuide}
              className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all font-semibold flex items-center gap-2 text-white"
            >
              <Plus size={16} />
              Add Scoring Criteria
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {formData.scoringGuides.map((guide) => (
            <div key={guide.id} className="bg-slate-800/30 rounded-xl border border-white/10 overflow-hidden">
              {/* Guide Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between" style={{ backgroundColor: guide.color + '10' }}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold bg-white/10 text-white">
                      {guide.order}
                    </div>
                    <div
                      className="w-6 h-6 rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/20"
                      style={{ backgroundColor: guide.color }}
                      title="Click to change color"
                      // Color picker could go here
                    ></div>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={guide.categoryTitle}
                      onChange={(e) => updateScoringGuide(guide.id, 'categoryTitle', e.target.value)}
                      className="bg-transparent text-lg font-bold outline-none border-b-2 border-transparent hover:border-orange-500/30 focus:border-orange-500 transition-colors px-2 text-white w-full"
                      placeholder="Category Title"
                    />
                    <input
                      type="text"
                      value={guide.categoryDescription}
                      onChange={(e) => updateScoringGuide(guide.id, 'categoryDescription', e.target.value)}
                      className="block bg-transparent text-sm text-gray-400 outline-none border-b-2 border-transparent hover:border-orange-500/30 focus:border-orange-500 transition-colors px-2 mt-1 w-full"
                      placeholder="Category Description"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => deleteScoringGuide(guide.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </div>
              </div>

              {/* Scoring Levels */}
              <div className="p-4 space-y-3">
                {guide.scores.map((score, scoreIdx) => (
                  <div key={scoreIdx} className="flex gap-4 items-start group">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold shrink-0 border-2"
                      style={{
                        backgroundColor: guide.color + '20',
                        borderColor: guide.color + '40',
                        color: guide.color
                      }}
                    >
                      {score.level}
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={score.description}
                        onChange={(e) => updateScore(guide.id, scoreIdx, e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 hover:bg-white/10 transition-colors text-white"
                        placeholder={`Description for level ${score.level}...`}
                      />
                    </div>
                    <button 
                      onClick={() => deleteScoreLevel(guide.id, scoreIdx)}
                      className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded-lg transition-all"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                ))}

                <button 
                  onClick={() => addScoreLevel(guide.id)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 border-dashed rounded-lg text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-gray-400 hover:text-white"
                >
                  <Plus size={16} />
                  Add Score Level
                </button>
              </div>
            </div>
          ))}

          {formData.scoringGuides.length === 0 && (
            <div className="text-center py-12">
              <Star size={48} className="mx-auto mb-4 text-gray-600" />
              <h4 className="text-lg font-semibold mb-2 text-white">No Scoring Criteria Yet</h4>
              <p className="text-sm text-gray-400 mb-4">Add scoring criteria to evaluate calls of this type</p>
              <button
                onClick={addNewScoringGuide}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all font-semibold inline-flex items-center gap-2 text-white"
              >
                <Plus size={18} />
                Add First Scoring Criteria
              </button>
            </div>
          )}
        </div>

        {/* Save Button */}
        {formData.scoringGuides.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-slate-900/50 flex items-center justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors text-white"
            >
              Cancel
            </button>
            <button 
              onClick={() => onSave(formData)}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all font-semibold flex items-center gap-2 text-white"
            >
              <Save size={16} />
              Save All Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
