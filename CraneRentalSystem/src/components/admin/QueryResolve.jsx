import { useState, useEffect } from 'react';
import axios from 'axios';

export default function QueryResolve() {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showOpenQueries, setShowOpenQueries] = useState(true); // State to track which section to show

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}Contact_us/getAllQueries`);
                const sortedQueries = response.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Newest queries on top
                );
                setQueries(sortedQueries);
            } catch (err) {
                setError('Failed to fetch queries.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQueries();
    }, []);

    const handleResolve = async (queryId) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}Contact_us/queries/${queryId}`, {
                status: 'resolved',
            });
            setQueries((prevQueries) =>
                prevQueries.map((query) =>
                    query._id === queryId ? { ...query, status: 'resolved' } : query
                )
            );
        } catch (err) {
            console.error('Failed to resolve query:', err);
            setError('Failed to resolve query.');
        }
    };

    if (loading) return <div>Loading queries...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    // Separate open and resolved queries
    const openQueries = queries.filter(query => query.status !== 'resolved');
    const resolvedQueries = queries.filter(query => query.status === 'resolved');

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">User Queries</h2>

            {/* Button to toggle sections */}
            <div className="mb-6">
                <button
                    onClick={() => setShowOpenQueries(!showOpenQueries)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {showOpenQueries ? 'Show Resolved Queries' : 'Show Open Queries'}
                </button>
            </div>

            {/* Grid Layout for Vertical Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Conditional rendering based on state */}
                {showOpenQueries ? (
                    <div className="border p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Open Queries</h3>
                        {openQueries.length === 0 ? (
                            <div>No open queries</div>
                        ) : (
                            <div className="grid gap-4">
                                {openQueries.map((query) => (
                                    <div key={query._id} className="border p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-semibold">{query.name}</h3>
                                                <p className="text-gray-600">{query.email}</p>
                                                <p className="text-gray-800">{query.message}</p>
                                                <p className="text-sm text-gray-500">
                                                    Submitted on: {new Date(query.createdAt).toLocaleString()}
                                                </p>
                                                <p
                                                    className={`text-sm mt-2 ${query.status === 'resolved' ? 'text-green-600' : 'text-red-600'}`}
                                                >
                                                    Status: {query.status}
                                                </p>
                                            </div>
                                            {query.status !== 'resolved' && (
                                                <button
                                                    onClick={() => handleResolve(query._id)}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                                >
                                                    Mark as Resolved
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="border p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Resolved Queries</h3>
                        {resolvedQueries.length === 0 ? (
                            <div>No resolved queries</div>
                        ) : (
                            <div className="grid gap-4">
                                {resolvedQueries.map((query) => (
                                    <div key={query._id} className="border p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-semibold">{query.name}</h3>
                                                <p className="text-gray-600">{query.email}</p>
                                                <p className="text-gray-800">{query.message}</p>
                                                <p className="text-sm text-gray-500">
                                                    Submitted on: {new Date(query.createdAt).toLocaleString()}
                                                </p>
                                                <p
                                                    className={`text-sm mt-2 ${query.status === 'resolved' ? 'text-green-600' : 'text-red-600'}`}
                                                >
                                                    Status: {query.status}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
