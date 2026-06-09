import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, ClipboardList, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/NavBar";
import { Suspense } from "react";

const SIDEBAR_ITEMS = [
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

const TITLES: Record<string, string> = {
  "/home": "Home page",
  "/products": "Management is not in securities",
  "/orders": "Sales transaction records",
  "/users": "User permissions",
  "/settings": "Advanced system appearance settings",
};


export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div
        className="flex flex-row counter m-auto min-h-screen min-w-[270px]
        w-full md:w-full lg:w-[1500px]
        text-foreground transition-colors duration-300"
        dir="ltr">

        {/* ممررين مصفوفة ثابتة الريفرنس بتاعها مبيتشلش من الميموري */}
        <AppSidebar items={SIDEBAR_ITEMS} />

        <div className="flex-1 flex flex-col min-w-0 md:justify-around">
          <div className="flex items-center justify-between border-b border-border bg-card px-4 gap-2">
            <div className="flex-1">
              <DashboardNavbar />
            </div>

            <SidebarTrigger />

            <Link to="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              <Settings />
            </Link>
          </div>

          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <Suspense fallback={<div>جاري التحميل...</div>}>
              <Outlet />
            </Suspense>
          </main>
        </div>

      </div>
    </SidebarProvider>
  );
}

function DashboardNavbar() {
  const location = useLocation();
  return <Navbar pageTitle={TITLES[location.pathname] || "لوحة التحكم"} />;
}