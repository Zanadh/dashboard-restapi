import React from 'react';
import { Navigate, Outlet, Route, RouteProps, Routes } from 'react-router-dom';
import { Navbar } from 'components';
import NotFound from '../pages/404';
import PrivateRoutes, { ProtectedRoute } from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import Login from '../pages/Auth/Login';
import useTypedSelector from '../hooks/useTypedSelector';

const DashboardLayout = () => (
  <div>
    <Navbar />
    <Outlet />
  </div>
);

const Home = () => {
  const accessToken = useTypedSelector((state) => state.sessions).accessToken;
  return (
    <div>
      <h1>HOME</h1>
      <h2>{JSON.stringify(accessToken)}</h2>
    </div>
  );
};

const Transaction = () => (
  <div>
    <h1>Transaction</h1>
  </div>
);

const User = () => (
  <div>
    <h1>User</h1>
  </div>
);

const Unauthorized = () => (
  <div>
    <h1>Unauthorized</h1>
  </div>
);

const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Home />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute access="READ_USER">
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaction"
        element={
          <ProtectedRoute access="READ_TRANSACTION">
            <Transaction />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/not-authorized" element={<Unauthorized />} />
    </Route>
  </Routes>
);

const AppRoutes = () => (
  <Routes>
    {/* public route */}
    <Route element={<PublicRoutes />}>
      <Route path="login" element={<Login />} />
    </Route>

    {/* protected route */}
    <Route element={<PrivateRoutes />}>
      <Route path="/*" element={<DashboardRoutes />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
