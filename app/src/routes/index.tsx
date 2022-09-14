import { Container } from '@mui/material';
import { Navbar } from 'components';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Login, NotFound, Transaction, User } from '../pages';
import Home from '../pages/Home';
import PrivateRoutes, { ProtectedRoute } from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const DashboardLayout = () => (
  <div>
    <Navbar />

    <Container maxWidth="xl">
      <Outlet />
    </Container>
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
