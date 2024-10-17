// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import PatientDetail from './pages/PatientDetail';
import PriorAuthorizationForm from './pages/PriorAuthorizationForm';
import AuthorizationReviewList from './pages/AuthorizationReviewList';
import AuthorizationReviewForm from './pages/AuthorizationReviewForm';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/patients/:patientId/prior-authorization" element={<PriorAuthorizationForm />} />
            <Route path="/review-authorizations" element={<AuthorizationReviewList />} />
            <Route path="/review-authorization/:id" element={<AuthorizationReviewForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;