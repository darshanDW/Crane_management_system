import React from 'react';

export default function ContractHeader({ contractNumber }) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Crane Rental Agreement</h1>
      <p className="text-gray-600">Contract #{contractNumber}</p>
    </div>
  );
}