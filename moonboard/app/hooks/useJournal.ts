import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://172.20.10.2:5001/api';

interface Journal {
  id: number;
  user_id: number;
  title: string;
  mood: string;
  entry_text: string;
  is_private: boolean;
  created_at: string;
}

export function useJournal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Now we add a token parameter to include in the request headers
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
        `${API_URL}/journal`,
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
    postJournal,
    loading,
    error,
  };
}