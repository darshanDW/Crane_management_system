import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';  // For adding icons

const Authentications = () => {
    const navigate = useNavigate();


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="text-center mb-8">
                <h1 className="text-white text-3xl font-semibold mb-4">Welcome to Our Platform</h1>
                <p className="text-white text-lg">Please choose an action to proceed</p>
            </div>
            <div className="flex flex-col gap-4">
                {/* Signup Button */}
                <button
                    onClick={() => navigate('/signup')}
                    className="flex items-center justify-center px-8 py-4 text-xl font-semibold text-white bg-indigo-600 rounded-lg shadow-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-all duration-300"
                >
                    <FaUserPlus className="mr-2" />
                    Signup
                </button>

                {/* Signin Button */}
                <button
                    onClick={() => navigate('/signin')}
                    className="flex items-center justify-center px-8 py-4 text-xl font-semibold text-indigo-600 bg-gray-100 rounded-lg shadow-xl hover:bg-gray-200 focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-all duration-300"
                >
                    <FaSignInAlt className="mr-2" />
                    Signin
                </button>
            </div>
        </div>
    );
};

export default Authentications;
