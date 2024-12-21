/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from './pages/HomePage';
import Authentications from './pages/Authentications';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import CraneList from './components/CraneList';
import BookingForm from './components/BookingForm';
import CraneInventory from './components/admin/CraneInventory';
import MaintenanceDashboard from './components/admin/MaintenanceDashboard';
import QuoteBuilder from './components/quotes/QuoteBuilder';
import QuoteList from './components/quotes/QuoteList';
import ContractPreview from './components/contracts/ContractPreview';
import SignContract from './components/contracts/SignContract';
import Dashboard from './components/admin/Dashboard';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={< Homepage />} />
          <Route path="/get-started" element={< Authentications />} />
          <Route path="/signup" element={< Signup />} />
          <Route path="/signin" element={< Signin />} />
          <Route path="/CranesPage" element={< CraneList />} />
          <Route path="/adminDashboard" element={< AdminDashboard />} />
          {/* <Route path='/get-started' element={< CraneList />} /> */}
          <Route path="/book/:id" element={<BookingForm />} />
          <Route path="/admin/inventory" element={<CraneInventory />} />
          <Route path="/admin/maintenance" element={<MaintenanceDashboard />} />
          <Route path="/createQuote" element={<QuoteBuilder />} />
          <Route path="/quotes" element={<QuoteList />} />
          <Route path="/contracts/:id" element={<ContractPreview />} />
          <Route path="/contracts/:id/sign" element={<SignContract />} />
          <Route path="/admin/Contracts" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App