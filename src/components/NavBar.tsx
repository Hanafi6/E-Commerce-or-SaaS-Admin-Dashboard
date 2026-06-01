import { Sun, Moon, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { SidebarTrigger } from "./ui/sidebar";

interface NavbarProps {
  pageTitle: string;
}

export default function Navbar({ pageTitle }: NavbarProps) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem("app-mode") === "dark" || 
      (!localStorage.getItem("app-mode") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("app-mode", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("app-mode", "light");
    }
  }, [isDark]);


  return (
    <div className="h-16 flex flex-row-reverse  items-center justify-between w-full">

      <span className="text-xs md:text-sm font-semibold text-foreground">{pageTitle}</span>


      <div className="flex items-center gap-3">

        <button 
          onClick={() => setIsDark(!isDark)} 
          className="p-2 rounded-lg border border-border hover:bg-muted text-foreground cursor-pointer transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-primary" />}
        </button>


        <button className="p-2 rounded-lg border border-border hover:bg-muted text-foreground relative cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full" />
        </button>

      </div>
    </div>
  );
}