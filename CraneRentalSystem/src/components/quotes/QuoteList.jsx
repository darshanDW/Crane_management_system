import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function QuoteList() {
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(''); // To track the filter selection

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/contracts`);
        setContracts(response.data);
        setFilteredContracts(response.data); // Initially, show all contracts
      } catch (error) {
        console.error('Error fetching contracts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  useEffect(() => {
    // Filter contracts based on the selected status
    if (statusFilter) {
      setFilteredContracts(contracts.filter(contract => contract.status === statusFilter));
    } else {
      setFilteredContracts(contracts); // Show all contracts if no filter is selected
    }
  }, [statusFilter, contracts]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Contract History</h2>

      {/* Filter Buttons */}
      <div className="mb-4">
        <button
          onClick={() => setStatusFilter('signed')}
          className={`mr-4 ${statusFilter === 'signed' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          Signed
        </button>
        <button
          onClick={() => setStatusFilter('draft')}
          className={`mr-4 ${statusFilter === 'draft' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          Draft
        </button>
        <button
          onClick={() => setStatusFilter('')}
          className={`${statusFilter === '' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          All
        </button>
      </div>

      <div className="grid gap-4">
        {filteredContracts.map(contract => (
          <div key={contract._id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  {contract.quoteId.clientInfo.company || contract.quoteId.clientInfo.name}
                  <p className="text-2xl font-bold">{contract.contractNumber}</p>
                </h3>
                <p className="text-gray-600">
                  {new Date(contract.createdAt).toLocaleDateString()}
                </p>
                <p>Status: {contract.status}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  ${contract.quoteId.totalPrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">{contract.quoteId.rentalDuration} days</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to={`/contracts/${contract._id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
