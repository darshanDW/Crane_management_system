import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import ChatBot from '../pages/ChatBot'

export default function CraneList() {
  const [cranes, setCranes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCranes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/cranes`);
        setCranes(response.data);
      } catch (error) {
        console.error('Error fetching cranes:', error);
      }
    };

    fetchCranes();
  }, []);

  const viewDocument = (url) => {
    const newTab = window.open(url, '_blank', 'noopener,noreferrer');
    if (newTab) {
      newTab.focus();
    } else {
      console.error('Failed to open new tab. Please check your popup settings.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ChatBot />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Cranes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cranes
            .filter((crane) => crane.status === 'available')
            .map((crane) => (
              <div key={crane._id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                {crane.imageUrl && (
                  <img
                    src={crane.imageUrl}
                    alt={`Crane #${crane.craneNumber}`}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Crane #{crane.craneNumber}</h2>
                  <p className="text-gray-600 mb-2">Type: {crane.type}</p>
                  <p className="text-gray-600 mb-2">Capacity: {crane.capacity} tons</p>
                  <p className="text-gray-600 mb-2">Rate: ${crane.hourlyRate}/hour</p>
                  <p className="text-gray-600 mb-4">
                    Last Maintenance: {new Date(crane.lastMaintenance).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${crane.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : crane.status === 'rented'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {crane.status}
                    </span>
                    <button
                      onClick={() => navigate('/createQuote', { state: { crane } })}
                      disabled={crane.status !== 'available'}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Book Now
                    </button>
                  </div>
                  {crane.documentUrl && (
                    <button
                      onClick={() => viewDocument(crane.documentUrl)}
                      className="mt-4 w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                    >
                      View Document
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}