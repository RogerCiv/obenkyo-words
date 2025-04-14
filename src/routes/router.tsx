import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import Noken5Page from '../pages/Noken5';
import Noken4Page from '../pages/Noken4';
import Noken3Page from '../pages/Noken3';
import ProtectedRoutes from '../utils/protectedRoutes';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from '../components/Layout';
import NotFound from '../pages/NotFound';
import NokensPage from '../pages/NokensPage';
import Noken2Page from '../pages/Noken2';
import Noken1Page from '../pages/Noken1';
import Profile from '../pages/Profile';
import PublicRoutes from '../utils/PublicRoutes';
import SettingsPage from '../pages/SettingsPage';

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login" 
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          } 
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/ajustes" element={<SettingsPage />} />
        </Route>
        <Route path="/nokens">
          <Route index element={<NokensPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="noken-5" element={<Noken5Page />} />
            <Route path="noken-4" element={<Noken4Page />} />
            <Route path="noken-3" element={<Noken3Page />} />
            <Route path="noken-2" element={<Noken2Page />} />
            <Route path="noken-1" element={<Noken1Page />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};