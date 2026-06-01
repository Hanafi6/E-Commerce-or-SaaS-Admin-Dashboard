import { useState, useEffect } from "react";
import { Check, Palette } from "lucide-react";

interface ColorTheme {
  id: string;
  name: string;
  preview: string;
  className: string;
}

const COLOR_THEMES: ColorTheme[] = [
  { id: "default", name: "النمط الرمادي الافتراضي", preview: "oklch(0.205 0 0)", className: "" },
  { id: "ocean", name: "ثيم الأزرق المريح (Ocean Breeze)", preview: "oklch(0.614 0.222 254.8)", className: "theme-ocean" },
  { id: "emerald", name: "ثيم الأخضر الزمردي (Emerald Garden)", preview: "oklch(0.627 0.194 149.2)", className: "theme-emerald" },
  { id: "orange", name: "ثيم البرتقالي الدافئ (Retro Orange)", preview: "oklch(0.646 0.222 41.1)", className: "theme-orange" },
];

export default function Settings() {
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    return localStorage.getItem("app-color-theme") || "default";
  });

  useEffect(() => {
    const root = document.documentElement;
    COLOR_THEMES.forEach((t) => {
      if (t.className) root.classList.remove(t.className);
    });

    const current = COLOR_THEMES.find((t) => t.id === activeTheme);
    if (current && current.className) {
      root.classList.add(current.className);
    }
    localStorage.setItem("app-color-theme", activeTheme);
  }, [activeTheme]);

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-6 text-right">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-primary m-0">تخصيص ألوان النظام المتقدمة</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-6">اختار باليتة الألوان المريحة لعينك، وسيتم تطبيق لون الـ Primary والـ Background متوافقاً مع المظهر الحالي.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {COLOR_THEMES.map((theme) => {
          const isSelected = activeTheme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id)}
              className={`p-4 rounded-xl border text-right flex items-center justify-between transition-all cursor-pointer ${
                isSelected ? "border-primary bg-primary/5 font-semibold" : "border-border hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full shrink-0 border border-black/10" style={{ backgroundColor: theme.preview }} />
                <span className="text-xs text-foreground">{theme.name}</span>
              </div>
              {isSelected && <Check className="w-4 h-4 text-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}