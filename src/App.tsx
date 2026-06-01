
import { createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
// import UsersDashboard from '@/pages/Dashboard' 

// import {Users,ChartColumnBig, Bolt, LayoutDashboard, ShoppingBag, ClipboardList} from 'lucide-react'

// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Button } from "@/components/ui/button"
// import {AppSidebar} from '@/components/app-sidebar.tsx'
// import { SidebarProvider} from '@/components/ui/sidebar';
// import ThemeSwitcher from '@/lib/ThemeSwitcher';
import Home from '@/pages/Home';
import DashboardLayout from '@/pages/DashboardLayout';
import ProductsPage from '@/pages/ProductsPage';
import OrderPage from '@/pages/OdrersPage';
import UsersPage from '@/pages/UsersPage';
import SittingsPage from '@/pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <div className="p-8 text-destructive text-center font-bold">عطلاً فني في النظام!</div>,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: '/home', element: <Home /> },
      { path: '/products', element: <ProductsPage /> },
      {path:'/orders',element:<OrderPage/>},
      {path:'/users',element:<UsersPage/>},
      {path:'/settings', element:<SittingsPage/>}
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}