import { useEffect, useState } from 'react';
import api from '../api';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 add loading

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me', { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false); // 🔥 set loading to false after fetch
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
