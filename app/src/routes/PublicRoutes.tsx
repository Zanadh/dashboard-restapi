import { Navigate, Outlet } from 'react-router-dom';

import useTypedSelector from 'hooks/useTypedSelector';

const PublicRoutes = () => {
  const isSignedIn = !!useTypedSelector((state) => state.sessions.accessToken);
  if (!isSignedIn) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default PublicRoutes;
