import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole } : any) => {
  const { hasPermission } = useAuth(); // Giả sử bạn đã có AuthContext với `hasPermission`

  if (!hasPermission(requiredRole)) {
    return <Navigate to="/maintenance/500" />;
  }

  return element;
};

export default ProtectedRoute;
