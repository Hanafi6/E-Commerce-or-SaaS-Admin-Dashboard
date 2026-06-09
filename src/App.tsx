
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// import ThemeSwitcher from '@/lib/ThemeSwitcher';
const Home = lazy(() => import('@/pages/Home'));
const DashboardLayout = lazy(() => import('@/pages/DashboardLayout'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const OrderPage = lazy(() => import('@/pages/OdrersPage'));
const UsersPage = lazy(() => import('@/pages/UsersPage'));
const SittingsPage = lazy(() => import('@/pages/Settings'));
import { lazy } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <div className="p-8 text-destructive text-center font-bold">عطلاً فني في النظام!</div>,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: '/home', element: <Home /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/orders', element: <OrderPage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/settings', element: <SittingsPage /> }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}