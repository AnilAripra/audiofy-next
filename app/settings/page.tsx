"use client";

import React, { useState } from "react";
import DashboardLayout from "../_components/DashboardLayout";
import SettingsTabs from "./_components/SettingsTabs/SettingsTabs";
import CallTypeTab from "./_components/CallTypeTab/CallTypeTab";
import AccountSettingsTab from "./_components/AccountSettingsTab/AccountSettingsTab";

const tabs = [
  'Call Type',
  'Account Settings',
  'Prompt Review',
  'Direct Reports',
  'Call Type Dashboard',
  'Departments',
  'Unlinked External Users',
  'SAR',
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Call Type');

  return (
    <DashboardLayout>
      <div className=" text-white ">
        {/* Header */}
        {/* <div className="mb-6"> */}
          {/* <h1 className="text-2xl font-bold mb-4 text-white">Settings</h1> */}
          <SettingsTabs 
            tabs={tabs} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        {/* </div> */}

        {/* Tab Content */}
        {activeTab === 'Call Type' ? (
          <CallTypeTab />
        ) : (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-12 border border-white/10 text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">{activeTab}</h2>
            <p className="text-gray-400">This section is under development</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
