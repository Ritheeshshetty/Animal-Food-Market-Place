// import { Navigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const { user, loading } = useAuth();

//   if (loading) return <p>Loading...</p>; // 🔥 Wait until auth is checked

//   if (!user) return <Navigate to="/login" />;

//   if (!allowedRoles.includes(user.role)) {
//     const redirectPath =
//       user.role === 'admin' ? '/admin' :
//       user.role === 'supplier' ? '/supplier' :
//       '/customer';

//     return <Navigate to={redirectPath} />;
//   }

//   return children;
// }


import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  const userRole = user?.role || 'guest'; // Treat null user as guest

  // ✅ If the user's role (or 'guest') is allowed, show the route
  if (allowedRoles.includes(userRole)) {
    return children;
  }

  // 🚫 If not allowed and user is unauthenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🚫 If user is authenticated but wrong role, redirect based on their role
  const redirectPath =
    user.role === 'admin' ? '/admin' :
    user.role === 'supplier' ? '/supplier' :
    '/customer';

  return <Navigate to={redirectPath} replace />;
}
