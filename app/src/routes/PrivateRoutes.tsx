import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useTypedSelector from '../hooks/useTypedSelector';

const PrivateRoutes = () => {
  const location = useLocation();
  const isSignedIn = !!useTypedSelector((state) => state.sessions.accessToken);
  if (!isSignedIn) return <Navigate to="/login" state={{ from: location }} replace />;

  return isSignedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;

export const isAllowed = (permissions = '', access?: string) => {
  if (!access) return true;

  return permissions.split(',').includes(access);
};

export const ProtectedRoute = ({
  access,
  children,
}: {
  access?: string;
  children: JSX.Element;
}) => {
  const { permissions } = useTypedSelector((state) => state.sessions);

  if (!isAllowed(permissions, access)) return <Navigate to="/not-authorized" replace />;

  return children;
};
