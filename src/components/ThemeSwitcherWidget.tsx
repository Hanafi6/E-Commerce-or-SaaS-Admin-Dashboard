import { useState, useEffect, MouseEvent } from "react";
import { Check, Palette, X } from "lucide-react";
import { COLOR_THEMES, saveColorTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeSwitcherWidgetProps {
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export default function ThemeSwitcherWidget({ position = "bottom-right" }: ThemeSwitcherWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState<string>("default");

    const [POSITION, setPOSITION] = useState<string>(() => {
        return localStorage.getItem('theme-switcher-position') || position;
    });

    useEffect(() => {
        const handleStorageOrThemeChange = () => {
            setActiveTheme(localStorage.getItem("app-color-theme") || "default");
        };

        const handlePositionChangeFromOutside = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail) {
                setPOSITION(customEvent.detail);
            }
        };

        handleStorageOrThemeChange();

        window.addEventListener("storage", handleStorageOrThemeChange);
        window.addEventListener("theme-changed", handleStorageOrThemeChange);
        window.addEventListener("theme-switcher-position-changed", handlePositionChangeFromOutside);

        return () => {
            window.removeEventListener("storage", handleStorageOrThemeChange);
            window.removeEventListener("theme-changed", handleStorageOrThemeChange);
            window.removeEventListener("theme-switcher-position-changed", handlePositionChangeFromOutside);
        };
    }, []);

    const handleThemeChange = (themeId: string) => {
        setActiveTheme(themeId);
        saveColorTheme(themeId);
    };

    const positionClasses = {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
        "top-right": "top-6 right-6",
        "top-left": "top-6 left-6",
    }[POSITION] || {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
        "top-right": "top-6 right-6",
        "top-left": "top-6 left-6",
    }[position]; // تظبيط الـ Fallback عشان يرجع string مش array

    const changePosition = (e: MouseEvent<HTMLSpanElement>) => {
        const newPosition = e.currentTarget.getAttribute("data-position");
        if (newPosition) {
            localStorage.setItem("theme-switcher-position", newPosition);
            window.dispatchEvent(new CustomEvent("theme-switcher-position-changed", { detail: newPosition }));
            setPOSITION(newPosition);
        }
    };

    const isBottom = POSITION.includes("bottom");
    const isRight = POSITION.includes("right");

    return (
        <aside className={`fixed ${positionClasses} transition-all duration-300 ease-out z-50`} dir="rtl" aria-label="مظهر النظام">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center cursor-pointer border border-border"
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <motion.div
                    key={isOpen ? "close" : "palette"}
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Palette className="w-5 h-5" />}
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.85,
                            y: isBottom ? 15 : -15
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            y: isBottom ? 10 : -10,
                            transition: { duration: 0.15 }
                        }}
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                        className={`absolute ${isBottom ? "bottom-16" : "top-16"} ${isRight ? "right-0" : "left-0"} w-72 bg-card border border-border rounded-2xl p-4 shadow-2xl text-start origin-${isBottom ? "bottom" : "top"}-${isRight ? "right" : "left"}`}
                    >
                        <header className="flex items-center justify-between gap-2 mb-3 border-b border-border pb-3">
                            <div className="flex items-center gap-1.5">
                                <Palette className="w-4 h-4 text-primary" />
                                <h4 className="text-xs font-bold text-foreground m-0">مظهر النظام</h4>
                            </div>

                            <section className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border/60" title="تغيير موضع الأداة">
                                <span
                                    onClick={changePosition}
                                    data-position="bottom-left"
                                    className={`w-7 h-6 rounded cursor-pointer flex items-end p-0.5 transition-all ${POSITION === "bottom-left"
                                        ? "bg-primary border border-primary shadow-sm"
                                        : "border border-border hover:bg-card/60"
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-sm ${POSITION === "bottom-left" ? "bg-primary-foreground" : "bg-muted-foreground"}`} />
                                </span>
                                <span
                                    onClick={changePosition}
                                    data-position="bottom-right"
                                    className={`w-7 h-6 rounded cursor-pointer flex items-end justify-end p-0.5 transition-all ${POSITION === "bottom-right"
                                        ? "bg-primary border border-primary shadow-sm"
                                        : "border border-border hover:bg-card/60"
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-sm ${POSITION === "bottom-right" ? "bg-primary-foreground" : "bg-muted-foreground"}`} />
                                </span>
                            </section>
                        </header>

                        <nav className="flex flex-col gap-1.5" aria-label="قائمة الثيمات المتاحة">
                            {COLOR_THEMES.map((theme) => {
                                const isSelected = activeTheme === theme.id;
                                return (
                                    <button
                                        key={theme.id}
                                        onClick={() => handleThemeChange(theme.id)}
                                        className={`w-full p-2.5 rounded-xl border text-start flex items-center justify-between transition-all cursor-pointer text-xs ${isSelected
                                            ? "border-primary bg-primary/10 font-bold"
                                            : "border-border hover:bg-muted"
                                            }`}
                                        role="menuitem"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span
                                                className="w-4 h-4 rounded-full shrink-0 border border-black/10 shadow-sm"
                                                style={{ backgroundColor: theme.preview }}
                                            />
                                            <span className="text-foreground font-medium">
                                                {theme.name.replace("ثيم ", "")}
                                            </span>
                                        </div>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                            >
                                                <Check className="w-3.5 h-3.5 text-primary" />
                                            </motion.div>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}