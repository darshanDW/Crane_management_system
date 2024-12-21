import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

export default function AdminDashboard() {
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCranes();
  }, []);

  const fetchCranes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/cranes`);
      setCranes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cranes:', error);
      setError('Failed to load cranes. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-8">{error}</div>;
  }

  return (

    <div className="container mx-auto px-4 py-8">
    <Navbar/>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Dashboard</h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crane Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cranes.map((crane) => (
                <tr key={crane._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {crane.craneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {crane.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${crane.status === 'available' ? 'bg-green-100 text-green-800' :
                        crane.status === 'rented' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                      }`}>
                      {crane.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {crane.lastMaintenance ? new Date(crane.lastMaintenance).toLocaleDateString() : 'No maintenance recorded'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/maintenance/${crane._id}`)}
                      className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                    >
                      View History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}