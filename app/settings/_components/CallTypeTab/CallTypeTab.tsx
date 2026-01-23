import React, { useState } from 'react';
import CallTypeList from './CallTypeList';
import CallTypeDetail from './CallTypeDetail';
import { CallType } from '../../types';
import { initialCallTypes } from '../../data';

export default function CallTypeTab() {
  const [callTypes, setCallTypes] = useState<CallType[]>(initialCallTypes);
  const [selectedCallType, setSelectedCallType] = useState<CallType | null>(null);

  const handleSave = (updatedCallType: CallType) => {
    setCallTypes(prev => {
      const exists = prev.find(ct => ct.id === updatedCallType.id);
      if (exists) {
        return prev.map(ct => ct.id === updatedCallType.id ? updatedCallType : ct);
      } else {
        return [...prev, updatedCallType];
      }
    });
    setSelectedCallType(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this Call Type?')) {
      setCallTypes(prev => prev.filter(ct => ct.id !== id));
    }
  };

  const handleAddNew = () => {
    const newCallType: CallType = {
      id: Date.now(),
      callType: 'New Call Type',
      direction: 'Inbound',
      departments: [],
      category: 'General',
      weighting: 1,
      eligibleForConversion: false,
      whatToListenFor: '',
      conversionDefinition: '',
      complianceDefinition: '',
      scoringGuides: []
    };
    setSelectedCallType(newCallType);
  };

  if (selectedCallType) {
    return (
      <CallTypeDetail
        callType={selectedCallType}
        onSave={handleSave}
        onCancel={() => setSelectedCallType(null)}
      />
    );
  }

  return (
    <CallTypeList
      callTypes={callTypes}
      onSelectCallType={setSelectedCallType}
      onDeleteCallType={handleDelete}
      onAddNew={handleAddNew}
    />
  );
}
