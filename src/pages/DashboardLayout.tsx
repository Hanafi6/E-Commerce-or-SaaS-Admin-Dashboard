import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, ClipboardList, Users, Settings, BellRing } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/NavBar";
import { lazy, useMemo } from "react";
// import ThemeSwitcherWidget from "@/components/ThemeSwitcherWidget";
const ThemeSwitcherWidget = lazy(() => import("@/components/ThemeSwitcherWidget"));

import { useTranslation } from "react-i18next";



// const SIDEBAR_ITEMS = [
//   { name: t('title'), path: "/home", icon: LayoutDashboard },
//   { name: t("Product management"), path: "/products", icon: ShoppingBag },
//   { name: t("Orders and sales"), path: "/orders", icon: ClipboardList },
//   { name: t("Users"), path: "/users", icon: Users },
//   { name: t("Advanced settings"), path: "/settings", icon: Settings },
//   { name: t("Notifications"), path: '/notifications', icon: BellRing }
// ].map(item => ({
//   path: item.path,
//   label: item.name,
//   icon: item.icon,
//   disabled: false
// }));

// خلها دالة بتاخد الـ t كـ parameter

const SIDEBAR_ITEMS = (t: (key: string) => string) => [
  { label: t('Dashboard'), path: "/home", icon: LayoutDashboard, disabled: false },
  { label: t("Product management"), path: "/products", icon: ShoppingBag, disabled: false },
  { label: t("Orders and sales"), path: "/orders", icon: ClipboardList, disabled: false },
  { label: t("Users"), path: "/users", icon: Users, disabled: false },
  { label: t("Advanced settings"), path: "/settings", icon: Settings, disabled: false },
  { label: t("Notifications"), path: '/notifications', icon: BellRing, disabled: false }
];

// const TITLES: Record<string, string> = {
//   "/home": "Home page",
//   "/products": "Management is not in securities",
//   "/orders": "Sales transaction records",
//   "/users": "User permissions",
//   "/settings": "Advanced system appearance settings",
// };

const TITLES = (t: (key: string) => string): Record<string, string> => ({
  "/home": t("Home page"),
  "/products": t("Management is not in securities"),
  "/orders": t("Sales transaction records"),
  "/users": t("User permissions"),
  "/settings": t("Advanced system appearance settings"),
});

export default function DashboardLayout() {
  const { t, i18n } = useTranslation();

  // دول الـ computed values اللي بيعتمدوا على اللغة
  const sidebarItems = useMemo(() => SIDEBAR_ITEMS(t), [t, i18n.language]);
  const titles = useMemo(() => TITLES(t), [t, i18n.language]);

  return (
    <SidebarProvider>
      {/* شلنا dir="ltr" عشان الموقع ياخد اتجاهه من الـ html tag اللي ظبطناه في App.tsx */}
      <div className="relative flex flex-row counter m-auto min-h-screen min-w-[270px] w-full md:w-full lg:w-[1500px] text-foreground transition-colors duration-300">

        <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/background1.avif')] bg-cover bg-center bg-no-repeat opacity-50 dark:opacity-30" />

        <div className="flex-1 flex flex-col min-w-0 md:justify-around z-10 relative">
          <div className="flex items-center justify-between border-b border-border bg-card/40 backdrop-blur-md px-4 gap-2 sticky top-0 z-50">
            <div className="flex-1">
              {/* بعتنا الـ titles المحسوبة */}
              <DashboardNavbar titles={titles} />
            </div>

            <SidebarTrigger className="cursor-pointer" />

            {/* بعتنا الـ sidebarItems المحسوبة */}
            <AppSidebar items={sidebarItems} />

            <Link to="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              <Settings />
            </Link>
          </div>

          <main className="flex-1 p-4 md:p-6">
            <Outlet />
            <ThemeSwitcherWidget position="bottom-right" />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// استلمنا الـ titles هنا عشان نستخدمها
function DashboardNavbar({ titles }: { titles: Record<string, string> }) {
  const location = useLocation();
  return <Navbar pageTitle={titles[location.pathname] || "Dashboard"} />;
}