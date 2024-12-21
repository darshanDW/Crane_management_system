import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Crane Rental System
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}