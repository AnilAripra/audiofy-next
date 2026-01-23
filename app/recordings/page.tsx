"use client";

import React, { useState } from "react";
import DashboardLayout from "../_components/DashboardLayout";
import RecordingsFilters from "./components/RecordingsFilters";
import RecordingsTable from "./components/RecordingsTable";
import RecordingModal from "./components/RecordingModal";

export default function RecordingsPage() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilters, setQuickFilters] = useState<Record<string, boolean>>({
    today: false,
    yesterday: false,
    last7Days: false,
    thisMonth: false,
    uploaded: false,
    transcribed: false,
    rated: false,
    commented: false,
    notCommented: false,
    conversionCalls: false,
    nonCompliant: false,
    horizon: false,
    xBees: false,
  });

  const toggleQuickFilter = (filter: string) => {
    setQuickFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const recordings = [
    {
      id: 1,
      userName: 'Nazmul Chowdhur',
      department: 'Sales',
      userNo: '+441923609482',
      otherParty: '+447760984398',
      duration: '0:56',
      connectTime: '19/01/26 8:55 pm',
      callType: 'Outbound Sales Lead',
      callStatus: 'OUT',
      statusBg: 'Being Completed',
      platform: 'Cairoplanet',
      branch: 'Barnet',
      conversion: 'No',
      compliance: 'N/A',
      average: '20.00%',
      comments: 'N/A',
      recordingSource: 'X-Bees',
      updatedAt: '19/01/2026',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      transcript: [
        { speaker: 'Agent', time: '00:03', endTime: '00:05', text: 'Hello, Mad Planner Watford. Zak speaking.', sentiment: 'neutral' },
        { speaker: 'Agent', time: '00:05', endTime: '00:06', text: 'How can I help you?', sentiment: 'positive' },
        { speaker: 'Customer', time: '00:06', endTime: '00:07', text: 'Oh, hello', sentiment: 'neutral' },
        { speaker: 'Customer', time: '00:07', endTime: '00:10', text: "I'm trying to get through to the Barnet site.", sentiment: 'neutral' },
        { speaker: 'Agent', time: '00:10', endTime: '00:13', text: 'Certainly, let me transfer your call right away.', sentiment: 'positive' },
        { speaker: 'Customer', time: '00:13', endTime: '00:15', text: 'Thank you so much!', sentiment: 'positive' },
      ],
      scores: [
        { name: 'Communication with Receiving Agent', rating: 'N/A', outOf: 3, color: 'gray', feedback: 'Not applicable for this call type' },
        { name: 'Clean Language', rating: 3, outOf: 3, color: 'green', feedback: 'Excellent professional language throughout' },
        { name: 'Greeting & Introduction', rating: 3, outOf: 3, color: 'green', feedback: 'Perfect greeting and identification' },
      ],
      totalWords: 66,
      wordsChanged: 0,
      accuracy: '100.00%',
      callSummary: 'Customer called to be transferred to Barnet location. Agent handled the request professionally with proper greeting and efficient service.',
    },
    {
      id: 3,
      userName: 'Omar El Harchaoui',
      department: 'Call Center - Sales',
      userNo: '+441923609482',
      otherParty: '+447844512199',
      duration: '3:09',
      connectTime: '19/01/26 8:48 pm',
      callType: 'Customer Appointment',
      callStatus: 'IN',
      statusBg: 'Being Completed',
      platform: 'Cairoplanet',
      branch: 'Mega',
      conversion: 'Yes',
      compliance: 'Yes',
      average: '76.00%',
      comments: 'Great call handling',
      recordingSource: 'X-Bees',
      updatedAt: '19/01/2026',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      transcript: [
        { speaker: 'Agent', time: '00:00', endTime: '00:04', text: 'MOTORS is connecting you to a sales enquiry', sentiment: 'neutral' },
        { speaker: 'Customer', time: '00:04', endTime: '00:05', text: 'Hello sir', sentiment: 'positive' },
        { speaker: 'Agent', time: '00:05', endTime: '00:09', text: 'Is this Watford?', sentiment: 'neutral' },
        { speaker: 'Agent', time: '00:09', endTime: '00:11', text: 'Yes, this is Watford', sentiment: 'positive' },
        { speaker: 'Agent', time: '00:11', endTime: '00:15', text: 'How can I help?', sentiment: 'positive' },
        { speaker: 'Customer', time: '00:15', endTime: '00:22', text: 'Actually, I received a call from your showroom. I work for Iron Tiguan', sentiment: 'neutral' },
        { speaker: 'Customer', time: '00:22', endTime: '00:25', text: 'And you want a number?', sentiment: 'neutral' },
        { speaker: 'Customer', time: '00:25', endTime: '00:28', text: 'Yes, can I get a number please?', sentiment: 'positive' },
        { speaker: 'Customer', time: '00:28', endTime: '00:30', text: 'M167ABK', sentiment: 'neutral' },
      ],
      scores: [
        { name: 'Greeting & Intro', rating: 3, outOf: 5, color: 'blue', feedback: 'Good introduction, could be more enthusiastic' },
        { name: 'Cancellation Handling', rating: 4, outOf: 5, color: 'green', feedback: 'Handled customer concerns effectively' },
        { name: 'Handling Customer Concerns', rating: 4, outOf: 5, color: 'green', feedback: 'Addressed all questions professionally' },
        { name: 'Rescheduling / Next Steps', rating: 4, outOf: 5, color: 'green', feedback: 'Clear next steps provided' },
        { name: 'Customer Satisfaction & Closing', rating: 4, outOf: 5, color: 'green', feedback: 'Good closing, ensured customer satisfaction' },
      ],
      totalWords: 341,
      wordsChanged: 0,
      accuracy: '100.00%',
      callSummary: 'Customer inquiry about a vehicle (M167ABK). Agent successfully handled the enquiry, provided information, and ensured customer satisfaction. Appointment scheduled for follow-up.',
    },
  ];

  const filteredRecordings = recordings.filter(record => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        record.userName.toLowerCase().includes(query) ||
        record.userNo.includes(query) ||
        record.otherParty.includes(query)
      );
    }
    // Basic implementation of quick filters (example)
    if (quickFilters.conversionCalls && record.conversion !== 'Yes') return false;
    if (quickFilters.nonCompliant && record.compliance !== 'No') return false;
    
    return true;
  });

  return (
    <DashboardLayout title="Recording History">
      <div className="space-y-4 text-slate-900 dark:text-white">
        <RecordingsFilters
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          quickFilters={quickFilters}
          toggleQuickFilter={toggleQuickFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <RecordingsTable
          recordings={filteredRecordings}
          onSelectRecording={setSelectedRecording}
        />

        {selectedRecording && (
          <RecordingModal
            selectedRecording={selectedRecording}
            onClose={() => setSelectedRecording(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
