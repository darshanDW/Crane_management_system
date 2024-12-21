import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import ContractHeader from './ContractHeader';
import ContractDetails from './ContractDetails';
import ContractActions from './ContractActions';
import { useLocation } from 'react-router-dom';
export default function ContractPreview() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [signature, setSignature] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { craneId } = location.state || {};
  console.log("CraneId", craneId)
  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}api/contracts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, craneId }),
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        console.log("Data", data)
        setContract(data);
      } catch (error) {
        console.error('Error fetching contract:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchContract();
  }, [id]);

  const handleAccept = async () => {
    if (!signature.trim()) {
      alert('Please provide a signature before accepting the contract.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/contracts/${id}/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signatureData: signature, craneId: craneId }),
      });
      console.log("Response", await response.json())

      setIsAccepted(true);
    } catch (error) {
      console.error('Error signing contract:', error);
    }
  };

  const generatePDF = () => {
    const element = document.getElementById('contract-content');
    html2pdf().from(element).save(`contract-${contract.contractNumber}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading contract details...</div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="text-center text-red-600">
        Contract not found or error loading contract details.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {isAccepted && signature && (
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
        >
          Download PDF
        </button>
      )}


      <div id="contract-content" className="bg-white p-8 rounded-lg shadow-lg">
        <ContractHeader contractNumber={contract.contractNumber} />
        <ContractDetails contract={contract} />
        <p>{contract.terms}</p>
        {contract.status === 'signed' && (
          <p className="mt-4 text-gray-800 font-bold">Signed by: {contract.signatureData}</p>
        )}

        {contract.status === 'draft' && (
          <p className="mt-4 text-gray-800 font-bold">Signed by: {signature}</p>
        )}
      </div>

      {isAccepted || contract.status === 'draft' && <div className="mt-6">
        <label className="block text-lg mb-2">Signature:</label>
        <input
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type your full name"
        />
      </div>}

      {contract.status === 'draft' && !isAccepted && (<div className="flex justify-end mt-6">
        <button
          onClick={handleAccept}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Accept Contract
        </button>
      </div>)}
    </div>
  );
}
