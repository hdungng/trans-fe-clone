import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole }: any) => {
  const { hasPermission, user } = useAuth(); 

  if (user && !hasPermission(requiredRole)) {
    // Nếu là User thì chuyển sang job-number/list
    if (user && user.role === 'User' && location.pathname === '/dashboard') {
      return <Navigate to="/job-number/list" replace />;
    }

    return <Navigate to="/maintenance/500" />;
  }

  return element;
};

export default ProtectedRoute;
