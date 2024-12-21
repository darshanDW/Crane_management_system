import React from 'react';

export default function ContractDetails({ contract }) {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold mb-2">Equipment Details</h3>
        <p>Crane Type: {contract.quoteId.craneType}</p>
        <p>Capacity: {contract.quoteId.capacity} tons</p>
        <p>Rental Duration: {contract.quoteId.rentalDuration} days</p>
        <p>Start Date: {new Date(contract.quoteId.startDate).toLocaleDateString()}</p>
      </div>
      
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold mb-2">Client Information</h3>
        <p>Name: {contract.quoteId.clientInfo.name}</p>
        <p>Company: {contract.quoteId.clientInfo.company}</p>
        <p>Email: {contract.quoteId.clientInfo.email}</p>
        <p>Phone: {contract.quoteId.clientInfo.phone}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Terms and Conditions</h3>
      </div>
    </div>
  );
}