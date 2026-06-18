import { useState, useEffect } from "react";
import {
  Palette,
  ShieldCheck,
  RefreshCcw,
  Monitor, SquareFunction

} from "lucide-react";

import { COLOR_THEMES, saveColorTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useDashboardActions } from "@/redux/Selectors/useDashboardActions";

const LANGUAGES = [
  { id: "ar", name: "العربية", native: "العربية" },
  { id: "en", name: "English", native: "English" },
  { id: "fr", name: "Français", native: "Français" },
];

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { refreshAllData } = useDashboardActions();

  const [activeTheme, setActiveTheme] = useState<string>(() => {
    return localStorage.getItem("app-color-theme") || "default";
  });

  const [currentLang, setCurrentLang] = useState<string>(() => {
    return localStorage.getItem("app-language") || "ar";
  });

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [platformName, setPlatformName] = useState("Mahmoud Analytics");
  // const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const handleThemeChangeFromOutside = () => {
      setActiveTheme(localStorage.getItem("app-color-theme") || "default");
    };
    window.addEventListener("theme-changed", handleThemeChangeFromOutside);
    return () => window.removeEventListener("theme-changed", handleThemeChangeFromOutside);
  }, []);

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    saveColorTheme(themeId);
  };

  const handleLanguageChange = (langId: string) => {
    setCurrentLang(langId);
    localStorage.setItem("app-language", langId);
    setIsLangDropdownOpen(false);
    i18n.changeLanguage(langId);
    document.documentElement.dir = langId === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="space-y-6 text-start" dir={currentLang === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <h1 className="text-lg font-bold font-mono tracking-tight text-foreground">
          {t("Advanced Settings")}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-card/50 border border-border/60 rounded-xl p-5 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-border/30 pb-2">
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-bold text-foreground">{t("General & Interface")}</h3>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground font-medium">{t("Platform Name")}</Label>
              <Input value={platformName} onChange={(e) => setPlatformName(e.target.value)} className=" border-border/40 text-xs h-9 text-center font-mono text-foreground" />
            </div>
            <div className="space-y-1.5 relative">
              <Label className="text-xs text-muted-foreground font-medium">{t("Default Language")}</Label>
              <button type="button" onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} className="w-full bg-primary text-accent border border-border/40 text-xs h-9 px-3 rounded-md flex items-center justify-between  font-mono">
                <span>{LANGUAGES.find(l => l.id === currentLang)?.name}</span>
              </button>
              {isLangDropdownOpen && (
                <div className="absolute z-50 top-[62px] left-0 w-full  border border-border/60 rounded-md overflow-hidden font-mono text-xs">
                  {LANGUAGES.map((lang) => (
                    <div key={lang.id} onClick={() => handleLanguageChange(lang.id)} className={`p-2.5 text-center cursor-pointer ${currentLang === lang.id ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground"}`}>
                      {lang.native}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card/50 border border-border/60 rounded-xl p-5 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-border/30 pb-2">
              <ShieldCheck className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-bold text-foreground">
                {t("Security & Users")}
              </h3>
            </div>

            <Button disabled variant="outline" className="w-full bg-card/50 select-none border-border/40 text-xs h-9 font-mono hover:bg-muted text-foreground">
              {t("Change Password")}
            </Button>

            <div className="space-y-1">
              <div className="text-[10px] text-left text-muted-foreground font-mono">Access level:</div>
              <div className="border border-border/30 rounded-md overflow-hidden text-[10px] font-mono text-center bg-[#070a0c]/40">
                <div className="grid grid-cols-4 bg-card p-1.5 text-muted-foreground border-b border-border/30">
                  <div>{t("Limited")}</div>
                  <div>{t("View Only")}</div>
                  <div>{t("Edit Access")}</div>
                  <div>{t("Administrator")}</div>
                </div>
                <div className="grid grid-cols-4 p-1.5 border-b border-border/20 text-foreground">
                  <div>✓</div>
                  <div>✓</div>
                  <div>✓</div>
                  <div className="text-muted-foreground/40">{t('Manager')}</div>
                </div>
                <div className="grid grid-cols-4 p-1.5 text-foreground">
                  <div>✓</div>
                  <div>✓</div>
                  <div>✓</div>
                  <div className="text-muted-foreground/40">{t('Viewer')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card/50 border border-border/60 rounded-xl p-5 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-border/30 pb-2">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-bold text-foreground">{t("Themes & Appearance")}</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {/* {COLOR_THEMES.map((theme) => {
                const isSelected = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`relative p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 bg-[#070a0c]/60 
              ${isSelected
                        ? "border-transparent"
                        : "border-border/40 hover:border-border/80"
                      }`}
                    style={{

                      boxShadow: isSelected ? `0 0 15px -3px ${theme.preview}60` : "none",
                      borderColor: isSelected ? theme.preview : undefined
                    }}
                  >

                    {isSelected && (
                      <div className="absolute inset-0 rounded-xl border border-border pointer-events-none" />
                    )}

                    <div
                      className="w-8 h-8 rounded-lg shadow-inner transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: theme.preview }}
                    >

                    </div>

                    <span className="text-[10px] text-foreground font-medium text-center leading-tight">
                      {t(theme.name)}
                    </span>
                  </button>
                );
              })} */}
              {COLOR_THEMES.map((theme) => {
                const isSelected = activeTheme === theme.id;
                const IconComp = theme.icon
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`relative p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 bg-[#070a0c]/60 
        ${isSelected
                        ? "border-transparent"
                        : "border-border/40 hover:border-border/80"
                      }`}
                    style={{
                      boxShadow: isSelected ? `0 0 15px -3px ${theme.preview}60` : "none",
                      borderColor: isSelected ? theme.preview : undefined
                    }}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none" />
                    )}

                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shadow-inner transition-transform duration-300 hover:scale-105"
                      style={{ backgroundColor: `${theme.preview}20`, color: theme.preview }}
                    >
                      <div className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">
                        <IconComp />
                      </div>
                    </div>

                    <span className="text-[10px] text-foreground font-medium text-center leading-tight">
                      {t(theme.name)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] text-muted-foreground text-center font-mono pt-3">
              {t("Text contrast is managed automatically")}
            </div>
          </div>
        </div>

        <div className="bg-card/50 border border-border/60 rounded-xl p-5 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-border/30 pb-2">
              <SquareFunction className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-bold text-foreground">{t("Methods and delegation")}</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
            </div>

            <div className="text-[10px] text-muted-foreground text-center font-mono pt-3">
              {t("Text contrast is managed automatically")}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card/80 border border-border/50 rounded-xl p-4 flex items-center justify-between">
        <h4 className="text-xs font-bold text-foreground">{t("Data & Synchronization")}</h4>
        <Button onClick={refreshAllData} size="sm" className="gap-2 text-xs h-9">
          <RefreshCcw className="w-3.5 h-3.5" />
          {t("Sync Data Manually")}
        </Button>
      </div>
    </div>
  );
}