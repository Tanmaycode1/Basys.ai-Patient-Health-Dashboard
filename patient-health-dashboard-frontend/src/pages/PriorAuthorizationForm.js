// src/pages/PriorAuthorizationForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createAuthorization } from '../services/api';
import { jwtDecode } from 'jwt-decode';  // Updated import statement

const PriorAuthorizationForm = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    treatmentType: '',
    insurancePlan: '',
    dateOfService: '',
    diagnosisCode: '',
    cpTcode: '',
    estimatedCost: '',
    additionalNotes: '',
  });
  const [error, setError] = useState(null);
  const [providerId, setProviderId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);  // Use jwtDecode instead of jwt_decode
      setProviderId(decodedToken.user.id);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!providerId) {
        throw new Error('Provider ID not found. Please log in again.');
      }
      const response = await createAuthorization({ ...formData, patientId, providerId });
      console.log('Authorization created:', response.data);
      navigate(`/patients/${patientId}`);
    } catch (err) {
      console.error('Error creating authorization:', err.response?.data || err.message);
      setError('Failed to submit authorization request: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 sm:px-6">
      <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-6">Prior Authorization Request</h1>
      {error && <p className="mt-2 text-sm text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="treatmentType" className="block text-sm font-medium text-gray-700">
            Treatment Type
          </label>
          <input
            type="text"
            name="treatmentType"
            id="treatmentType"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.treatmentType}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="insurancePlan" className="block text-sm font-medium text-gray-700">
            Insurance Plan
          </label>
          <input
            type="text"
            name="insurancePlan"
            id="insurancePlan"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.insurancePlan}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="dateOfService" className="block text-sm font-medium text-gray-700">
            Date of Service
          </label>
          <input
            type="date"
            name="dateOfService"
            id="dateOfService"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.dateOfService}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="diagnosisCode" className="block text-sm font-medium text-gray-700">
            Diagnosis Code
          </label>
          <input
            type="text"
            name="diagnosisCode"
            id="diagnosisCode"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.diagnosisCode}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="cpTcode" className="block text-sm font-medium text-gray-700">
            CPT Code
          </label>
          <input
            type="text"
            name="cpTcode"
            id="cpTcode"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.cpTcode}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="estimatedCost" className="block text-sm font-medium text-gray-700">
            Estimated Cost
          </label>
          <input
            type="number"
            name="estimatedCost"
            id="estimatedCost"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.estimatedCost}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            name="additionalNotes"
            id="additionalNotes"
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.additionalNotes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
        {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriorAuthorizationForm;