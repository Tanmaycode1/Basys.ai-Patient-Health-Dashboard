// src/__tests__/Dashboard.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getPatients, getAuthorizations } from '../services/api';
import Dashboard from '../pages/Dashboard';

jest.mock('../services/api');

describe('Dashboard Component', () => {
  beforeEach(() => {
    getPatients.mockResolvedValue({ data: [{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Doe' }] });
    getAuthorizations.mockResolvedValue({ 
      data: [
        { id: '1', status: 'pending' },
        { id: '2', status: 'approved' },
        { id: '3', status: 'denied' }
      ] 
    });
  });

  it('renders dashboard with patient count and authorization stats', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Total Patients')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument(); // Total patients
      expect(screen.getByText('Pending Authorizations')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Pending authorizations
      expect(screen.getByText('Approved Authorizations')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Approved authorizations
    });
  });

  it('displays error message when API call fails', async () => {
    getPatients.mockRejectedValue(new Error('Failed to fetch patients'));
    
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
    });
  });
});