/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from './pages/HomePage';
import Authentications from './pages/Authentications';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import CranesPage from './pages/CranesPage';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={< Homepage />} />
          <Route path="/get-started" element={< CranesPage />} />
          <Route path="/signup" element={< Signup />} />
          <Route path="/signin" element={< Signin />} />
          <Route path="/CranesPage" element={< CranesPage />} />
          <Route path='/admindashboard' element={< AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App