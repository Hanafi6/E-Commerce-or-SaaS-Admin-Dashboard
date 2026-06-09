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
  useSidebar,
} from "@/components/ui/sidebar";

import { Link, useLocation } from "react-router-dom";

import { LayoutDashboard, type LucideIcon } from 'lucide-react';
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

  return (
    <>
      <Sidebar side="left" className="border-l opacity-[90%] border-border  fixed  h-screen z-50 text-left">

        <SidebarHeader className="h-16 flex items-center justify-center bg-card border-b border-border px-6">
          <LayoutDashboard />
        </SidebarHeader>

        {/* محتوى القائمة */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-right px-3 text-[11px] font-semibold text-muted-foreground mb-2 w-full block">
              لوحة التحكم الإدارية
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const IconComp = item.icon;

                  return (
                    <SidebarMenuItem key={item.path}>
                      {item.disabled ? (
                        <div className="flex items-center gap-3 w-full px-3 py-2.5 text-xs text-muted-foreground opacity-50 cursor-not-allowed justify-start">
                          <IconComp className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={`w-full transition-all duration-200 cursor-pointer justify-start ${isActive
                            ? "bg-primary text-primary-foreground font-bold hover:bg-primary/90"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                          <Link
                            to={item.path}
                            onClick={() => setOpenMobile(false)}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-xs justify-start"
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

        {/* الفوتر */}
        <SidebarFooter className="p-4 border-t border-border text-center text-[10px] text-muted-foreground">
          الإصدار v4.0.0 • صُنع بحب 💻
        </SidebarFooter>
      </Sidebar>
    </>
  );
})
export default AppSidebar;