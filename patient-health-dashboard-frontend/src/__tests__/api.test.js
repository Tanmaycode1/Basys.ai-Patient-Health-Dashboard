// src/__tests__/api.test.js
import axios from 'axios';
import { login, getPatients, createAuthorization } from '../services/api';

jest.mock('axios');

describe('API Service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('login makes a POST request to /auth/login', async () => {
    const mockResponse = { data: { token: 'fake-token' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await login('testuser', 'password123');

    expect(axios.post).toHaveBeenCalledWith('/auth/login', { username: 'testuser', password: 'password123' });
    expect(result).toEqual(mockResponse);
  });

  it('getPatients makes a GET request to /patients', async () => {
    const mockResponse = { data: [{ id: 1, name: 'John Doe' }] };
    axios.get.mockResolvedValueOnce(mockResponse);

    const result = await getPatients();

    expect(axios.get).toHaveBeenCalledWith('/patients');
    expect(result).toEqual(mockResponse);
  });

  it('createAuthorization makes a POST request to /authorizations', async () => {
    const mockAuthData = { patientId: '123', treatmentType: 'Test' };
    const mockResponse = { data: { id: '456', ...mockAuthData } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await createAuthorization(mockAuthData);

    expect(axios.post).toHaveBeenCalledWith('/authorizations', mockAuthData);
    expect(result).toEqual(mockResponse);
  });
});