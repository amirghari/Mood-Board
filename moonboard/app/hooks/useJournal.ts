import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://172.20.10.2:5001/api/journal';

interface Journal {
  id: number;
  title: string;
  mood: string;
  entry_text: string;
  created_at: string;
  username?: string;
}

export function useJournal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getJournals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch journals');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const postJournal = async (
    title: string,
    mood: string,
    entry_text: string,
    is_private: boolean,
    token: string | null
  ): Promise<Journal> => {
    setLoading(true);
    setError(null);
    try {
      console.log('useJournal: Posting journal with token:', token);
      const response = await axios.post<Journal>(
        `${API_URL}`,
        { title, mood, entry_text, is_private },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );
      console.log('useJournal: Journal posted:', response.data);
      return response.data;
    } catch (err) {
      console.error('useJournal: Post error:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Posting journal failed');
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getJournals,
    postJournal,
    loading,
    error,
  };
}