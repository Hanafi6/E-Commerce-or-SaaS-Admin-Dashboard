import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, ClipboardList, Users, Settings } from "lucide-react";
import Navbar from "@/components/NavBar";
import { useEffect } from "react";


export default function DashboardLayout() {
  const location = useLocation();



  const sidebarItems = [
    { name: "الرئيسية", path: "/home", icon: LayoutDashboard },
    { name: "إدارة المنتجات", path: "/products", icon: ShoppingBag },
    { name: "الطلبات والمبيعات", path: "/orders", icon: ClipboardList },
    { name: "المستخدمين", path: "/users", icon: Users },
    { name: "الإعدادات المتقدمة", path: "/settings", icon: Settings },
  ].map(item => ({
    path: item.path,
    label: item.name,
    icon: item.icon,
    disabled: false
  }));

  const titles: Record<string, string> = {
    "/home": "Home page",
    "/products": "Management is not in securities",
    "/orders": "Sales transaction records",
    "/users": "User permissions",
    "/settings": "Advanced system appearance settings",
  };

  return (
    <SidebarProvider>
      <div className="flex  flex-row-reverse counter min-h-screen w-full  text-foreground transition-colors duration-300" dir="ltr">
        {/* <AppSidebar items={sidebarItems} /> */}
        
        <AppSidebar items={sidebarItems}/>
        
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between border-b border-border bg-card px-4 gap-2">
            <div className="flex-1">
              <Navbar pageTitle={titles[location.pathname] || "لوحة التحكم"} />
            </div>
              <SidebarTrigger/>
          </div>

          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>

      </div>
    </SidebarProvider>
  );
}