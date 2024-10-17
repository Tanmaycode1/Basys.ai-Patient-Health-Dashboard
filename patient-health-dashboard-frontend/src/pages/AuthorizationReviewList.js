// src/pages/AuthorizationReviewList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuthorizations } from '../services/api';

const AuthorizationReviewList = () => {
  const [authorizations, setAuthorizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorizations = async () => {
      try {
        const response = await getAuthorizations();
        setAuthorizations(response.data.filter(auth => auth.status === 'pending'));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch authorizations');
        setLoading(false);
      }
    };

    fetchAuthorizations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-6">Authorizations to Review</h1>
      {authorizations.length === 0 ? (
        <p>No pending authorizations to review.</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {authorizations.map(auth => (
              <li key={auth._id}>
                <Link to={`/review-authorization/${auth._id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {auth.treatmentType}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {auth.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Patient ID: {auth.patientId}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Submitted on: {new Date(auth.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuthorizationReviewList;