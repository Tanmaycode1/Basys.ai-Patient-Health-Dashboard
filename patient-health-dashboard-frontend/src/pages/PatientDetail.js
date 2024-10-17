import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPatient, getPatientAuthorizations } from '../services/api';

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [authorizations, setAuthorizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientResponse = await getPatient(id);
        setPatient(patientResponse.data);
        
        const authorizationsResponse = await getPatientAuthorizations(id);
        setAuthorizations(authorizationsResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch patient data');
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!patient) return <div>Patient not found</div>;

  return (
    <div className="px-4 py-5 sm:px-6">
      <h1 className="text-3xl font-bold leading-tight text-gray-900">{patient.name}</h1>
      <div className="mt-4 border-t border-gray-200 pt-4">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Age</dt>
            <dd className="mt-1 text-sm text-gray-900">{patient.age} years old</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Condition</dt>
            <dd className="mt-1 text-sm text-gray-900">{patient.condition}</dd>
          </div>
          {/* Add more patient details here */}
        </dl>
      </div>
      
      <h2 className="mt-6 text-2xl font-bold leading-tight text-gray-900">Authorizations</h2>
      <ul className="mt-4 space-y-4">
        {authorizations.map(auth => (
          <li key={auth._id} className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {auth.treatmentType}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Status: {auth.status}
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Date of Service: {new Date(auth.dateOfService).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
      
      <Link
        to={`/patients/${id}/prior-authorization`}
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        New Authorization Request
      </Link>
    </div>
  );
};

export default PatientDetail;