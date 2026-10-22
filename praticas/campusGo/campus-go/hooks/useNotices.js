import { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';

export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchApi('/posts?_limit=10');
      setNotices(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadNotices(); }, []);

  return { notices, isLoading, error, reload: loadNotices };
}