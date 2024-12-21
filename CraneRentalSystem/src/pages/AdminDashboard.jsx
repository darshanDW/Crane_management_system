import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Crane Rental System
          </Link>
          <div className="space-x-4">
            <Link to="/admin/inventory" className="hover:text-blue-200">
              Inventory
            </Link>
            <Link to="/admin/maintenance" className="hover:text-blue-200">
              Maintenance
            </Link>

            <Link to="/quotes" className="hover:text-blue-200">contracts</Link>
            <Link to="/adminDashboard" className="hover:text-blue-200">Admin</Link>
            <Link to="/Quories" className="hover:text-blue-200">Quories</Link>

          </div>
        </div>
      </div>
    </nav>
  );
}