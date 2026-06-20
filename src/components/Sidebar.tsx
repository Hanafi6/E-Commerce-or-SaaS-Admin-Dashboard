import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { useTranslation } from "react-i18next";


import { Link, useLocation } from "react-router-dom";

import { LayoutDashboard, X, type LucideIcon } from 'lucide-react';
import React from "react";

interface ISidebarItem {
  path: string;
  label: string;
  icon: LucideIcon;
  disabled: boolean;
}

interface AppSidebarProps {
  items: ISidebarItem[];
}

const AppSidebar = React.memo(function AppSidebar({ items }: AppSidebarProps) {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();
  const { t, i18n } = useTranslation();

  const sidebarSide = i18n.language === 'ar' ? 'right' : 'left';

  return (
    <Sidebar side={sidebarSide} className="border-e opacity-[90%] border-border fixed h-screen z-50">
      <SidebarHeader className="h-16 flex flex-row items-center justify-around border-b border-border px-6">
        <LayoutDashboard />
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupLabel className="text-start px-3 text-[11px] font-semibold text-muted-foreground mb-2 w-full block">
            {t("Administrative control panel")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = location.pathname === item.path;
                const IconComp = item.icon;

                return (
                  <SidebarMenuItem key={item.path}>
                    {item.disabled ? (
                      <div className="flex items-center gap-3 w-full px-3 py-2.5 text-xs text-muted-foreground opacity-50 cursor-not-allowed text-start">
                        <IconComp className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`w-full transition-all duration-200 cursor-pointer text-start ${isActive
                          ? "bg-primary text-primary-foreground font-bold hover:bg-primary/90"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setOpenMobile(false)}
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-xs"
                        >
                          <IconComp className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border text-center text-[10px] text-muted-foreground">
        {t("Version v4.0.0 • Made with love 💻")}
      </SidebarFooter>
    </Sidebar>
  );
});

export default AppSidebar;