import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../redux/actions';

const PrivateRoutePanelAdmin = ({ children }) => {
  const location = useLocation();
  const usuario = isAuthenticated();

  if (!usuario.usuario || !usuario.usuario.is_admin) {
    return <Navigate to="/error" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoutePanelAdmin;