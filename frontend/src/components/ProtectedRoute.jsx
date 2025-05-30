import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // 🔥 Wait until auth is checked

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role)) {
    const redirectPath =
      user.role === 'admin' ? '/admin' :
      user.role === 'supplier' ? '/supplier' :
      '/customer';

    return <Navigate to={redirectPath} />;
  }

  return children;
}
