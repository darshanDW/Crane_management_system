import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

export default function MaintenanceHistory() {
  const { id } = useParams();
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/maintenance/${id}`);
        setMaintenance(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching maintenance history:', error);
        setError('Failed to load maintenance history. Please try again later.');
        setLoading(false);
      }
    };

    fetchMaintenance();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Maintenance History</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
        {maintenance.length > 0 ? (
          <div className="space-y-6">
            {maintenance.map((record) => (
              <div key={record._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{record.type}</h3>
                    <p className="text-gray-600 mt-2">{record.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Technician: {record.technician}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {format(new Date(record.date), 'PPP')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No maintenance records found.</p>
        )}
      </div>
    </div>
  );
}