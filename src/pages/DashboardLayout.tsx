// import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import AppSidebar from "@/components/Sidebar";
// import { Outlet, useLocation } from "react-router-dom";
// import { LayoutDashboard, ShoppingBag, ClipboardList, Users, Settings, BellRing } from "lucide-react";
// import { Link } from "react-router-dom";
// import Navbar from "@/components/NavBar";
// import { lazy, useMemo } from "react";
// const ThemeSwitcherWidget = lazy(() => import("@/components/ThemeSwitcherWidget"));

// import { useTranslation } from "react-i18next";



// const SIDEBAR_ITEMS = (t: (key: string) => string) => [
//   { label: t('Dashboard'), path: "/home", icon: LayoutDashboard, disabled: false },
//   { label: t("Product management"), path: "/products", icon: ShoppingBag, disabled: false },
//   { label: t("Orders and sales"), path: "/orders", icon: ClipboardList, disabled: false },
//   { label: t("Users"), path: "/users", icon: Users, disabled: false },
//   { label: t("Advanced settings"), path: "/settings", icon: Settings, disabled: false },
//   { label: t("Notifications"), path: '/notifications', icon: BellRing, disabled: false }
// ];

// const TITLES = (t: (key: string) => string): Record<string, string> => ({
//   "/home": t("Home page"),
//   "/products": t("Management is not in securities"),
//   "/orders": t("Sales transaction records"),
//   "/users": t("User permissions"),
//   "/settings": t("Advanced system appearance settings"),
// });

// export default function DashboardLayout() {
//   const { t, i18n } = useTranslation();
//   const sidebarItems = useMemo(() => SIDEBAR_ITEMS(t), [t, i18n.language]);
//   const titles = useMemo(() => TITLES(t), [t, i18n.language]);

//   return (
//     <SidebarProvider>
//       <AppSidebar items={sidebarItems} />

//       <SidebarInset className="relative min-h-screen bg-transparent overflow-x-hidden">


//         <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card/40 backdrop-blur-md px-4">
//           <SidebarTrigger className="-ml-1" />
//           <DashboardNavbar titles={titles} />
//         </header>

//         <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:max-w-[1600px] lg:mx-auto">
//           <Outlet />
//           <ThemeSwitcherWidget position="bottom-right" />
//         </main>
//       </SidebarInset>
//     </SidebarProvider>


//   );
// }

// function DashboardNavbar({ titles }: { titles: Record<string, string> }) {
//   const location = useLocation();
//   return <Navbar pageTitle={titles[location.pathname] || "Dashboard"} />;
// }

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, ClipboardList, Users, Settings, BellRing } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/NavBar";
import { lazy, useMemo } from "react";
const ThemeSwitcherWidget = lazy(() => import("@/components/ThemeSwitcherWidget"));

import { useTranslation } from "react-i18next";



const SIDEBAR_ITEMS = (t: (key: string) => string) => [
  { label: t('Dashboard'), path: "/home", icon: LayoutDashboard, disabled: false },
  { label: t("Product management"), path: "/products", icon: ShoppingBag, disabled: false },
  { label: t("Orders and sales"), path: "/orders", icon: ClipboardList, disabled: false },
  { label: t("Users"), path: "/users", icon: Users, disabled: false },
  { label: t("Advanced settings"), path: "/settings", icon: Settings, disabled: false },
  { label: t("Notifications"), path: '/notifications', icon: BellRing, disabled: false }
];


const TITLES = (t: (key: string) => string): Record<string, string> => ({
  "/home": t("Home page"),
  "/products": t("Management is not in securities"),
  "/orders": t("Sales transaction records"),
  "/users": t("User permissions"),
  "/settings": t("Advanced system appearance settings"),
});

export default function DashboardLayout() {
  const { t, i18n } = useTranslation();

  const sidebarItems = useMemo(() => SIDEBAR_ITEMS(t), [t, i18n.language]);
  const titles = useMemo(() => TITLES(t), [t, i18n.language]);

  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} />
      <div className="relative flex flex-row counter m-auto min-h-screen min-w-[270px] w-full md:w-full lg:w-[2000px] text-foreground transition-colors duration-300">

        <div className="flex-1 flex flex-col min-w-0 md:justify-around z-10 relative">
          <div className="flex items-center justify-between border-b border-border bg-card/40 backdrop-blur-md px-4 gap-2 sticky top-0 z-50">
            <div className="flex-1">
              <DashboardNavbar titles={titles} />
            </div>

            <SidebarTrigger className="cursor-pointer" />


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

function DashboardNavbar({ titles }: { titles: Record<string, string> }) {
  const location = useLocation();
  return <Navbar pageTitle={titles[location.pathname] || "Dashboard"} />;
}