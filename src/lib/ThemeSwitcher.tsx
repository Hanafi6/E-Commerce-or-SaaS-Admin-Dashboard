import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { useState, useEffect } from "react"

// تعيين الـ Types للثيمات بشكل صارم لجودة التايب سكريبت
interface Theme {
  id: string;
  name: string;
  preview: string;
  className: string; // اسم الـ كلاس اللي هينزل في الـ HTML
}

const SYSTEM_THEMES: Theme[] = [
  {
    id: 'default-dark',
    name: 'النمط الليلي الافتراضي',
    preview: 'oklch(0.205 0 0)',
    className: '' // الفاضي يعني هيقرأ الـ :root الافتراضي
  },
  {
    id: 'ocean-breeze',
    name: 'ثيم الأزرق المريح',
    preview: 'oklch(0.614 0.222 254.8)',
    className: 'theme-ocean'
  },
  {
    id: 'emerald-garden',
    name: 'ثيم الأخضر الزمردي',
    preview: 'oklch(0.627 0.194 149.2)',
    className: 'theme-emerald'
  }
];

export default function ThemeSwitcher() {
  // بنحفظ الثيم في الـ localState وممكن نرفعه لـ localStorage بعدين عشان يثبت لما المستخدم يعمل ريفريش
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    return localStorage.getItem('app-theme') || 'default-dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // بنشيل الكلاسات القديمة تماماً عشان مينزلش كذا ثيم فوق بعض
    SYSTEM_THEMES.forEach(theme => {
      if (theme.className) root.classList.remove(theme.className);
    });

    // بنشوف الثيم الحالي ونحط الكلاس بتاعه لو موجود
    const currentTheme = SYSTEM_THEMES.find(t => t.id === activeTheme);
    if (currentTheme && currentTheme.className) {
      root.classList.add(currentTheme.className);
    }
    
    localStorage.setItem('app-theme', activeTheme);
  }, [activeTheme]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-border bg-card text-foreground hover:bg-muted shadow-sm flex items-center gap-2">
          🎨 تخصيص مظهر النظام
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-3 bg-popover text-popover-foreground border-border shadow-lg rounded-xl" align="start" dir="rtl">
        <div className="space-y-2">
          <div>
            <h3 className="font-bold text-sm text-foreground text-right">أنماط ألوان مريحة للعين</h3>
            <p className="text-[11px] text-muted-foreground text-right">اختار النمط اللي يريح عيونك أثناء العمل</p>
          </div>
          
          <hr className="border-border" />
          
          <div className="space-y-1">
            {SYSTEM_THEMES.map((theme) => {
              const isSelected = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className={`w-full text-right text-xs p-2.5 rounded-lg flex items-center justify-between transition-all ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm' 
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10" style={{ backgroundColor: theme.preview }} />
                    <span>{theme.name}</span>
                  </div>
                  {isSelected && <span className="text-[10px]">● نشط</span>}
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}