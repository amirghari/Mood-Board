// app/hooks/useAuth.ts
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://172.20.10.2:5001/api';

interface User {
  id: number;
  username: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      console.log('useAuth: Starting login process');
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
        username,
        password
      });
      console.log('useAuth: Login successful:', response.data);
      return response.data;
    } catch (err) {
      console.error('useAuth: Login error:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, password: string, name: string): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      console.log('useAuth: Starting registration process');
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
        username,
        password,
        name
      });
      console.log('useAuth: Registration successful:', response.data);
      return response.data;
    } catch (err) {
      console.error('useAuth: Registration error:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Registration failed');
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
    error
  };
}