import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import PageLoader from './pages/PageLoader'; // تأكد من مسار اللودر العالمي بتاعك
import NotFound from './pages/NotFound';
import { useTranslation } from 'react-i18next';

const Home = lazy(() => import('@/pages/Home'));
const DashboardLayout = lazy(() => import('@/pages/DashboardLayout'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const OrderPage = lazy(() => import('@/pages/OdrersPage'));
const UsersPage = lazy(() => import('@/pages/UsersPage'));
const SittingsPage = lazy(() => import('@/pages/Settings'));
const NotificationPage = lazy(() => import('@/pages/NotificationPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/home" replace /> },

      { path: 'home', element: <Home /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'orders', element: <OrderPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'settings', element: <SittingsPage /> },
      { path: '/notifications', element: <NotificationPage /> },

      { path: '*', element: <NotFound /> }
    ],
  },
]);

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir; // ده بيغير الـ dir بتاع الـ html tag
    document.documentElement.lang = i18n.language; // بيغير اللغة
  }, [i18n, i18n.language]);

  return <RouterProvider router={router} />;
}