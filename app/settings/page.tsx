import React from "react";
import DashboardLayout from "../_components/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-bold mb-2">Settings</h2>
          <p className="text-sm text-gray-400">
            Application settings and configuration will be displayed here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

