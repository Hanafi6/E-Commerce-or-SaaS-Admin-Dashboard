export interface ColorTheme {
  id: string;
  name: string;
  preview: string;
  className: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  { id: "default", name: "النمط الرمادي الافتراضي", preview: "oklch(0.205 0 0)", className: "" },
  { id: "ocean", name: "ثيم الأزرق المريح (Ocean Breeze)", preview: "oklch(0.614 0.222 254.8)", className: "theme-ocean" },
  { id: "emerald", name: "ثيم الأخضر الزمردي (Emerald Garden)", preview: "oklch(0.627 0.194 149.2)", className: "theme-emerald" },
  { id: "orange", name: "ثيم البرتقالي الدافئ (Retro Orange)", preview: "oklch(0.646 0.222 41.1)", className: "theme-orange" },
];

const COLOR_THEME_KEY = "app-color-theme";
const MODE_KEY = "app-mode";

export function applyColorTheme(themeId: string) {
  const root = document.documentElement;
  COLOR_THEMES.forEach((t) => {
    if (t.className) root.classList.remove(t.className);
  });

  const current = COLOR_THEMES.find((t) => t.id === themeId);
  if (current?.className) {
    root.classList.add(current.className);
  }
}

export function applyDarkMode() {
  const root = document.documentElement;
  const stored = localStorage.getItem(MODE_KEY);
  const prefersDark =
    !stored && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (stored === "dark" || prefersDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function initTheme() {
  applyDarkMode();
  applyColorTheme(localStorage.getItem(COLOR_THEME_KEY) || "default");
}

export function saveColorTheme(themeId: string) {
  localStorage.setItem(COLOR_THEME_KEY, themeId);
  applyColorTheme(themeId);
}
