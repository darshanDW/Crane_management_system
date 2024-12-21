import React from 'react';

export default function ContractActions({ onDownload, onSign }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Contract Preview</h2>
      <div className="space-x-4">
        <button
          onClick={onDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
        <button
          onClick={onSign}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Sign Contract
        </button>
      </div>
    </div>
  );
}