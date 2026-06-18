import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 🚀 استيراد الملفات اللي الأداة هتنشأها تلقائياً
import translationAR from "@/locales/ar.json";
import translationEN from "@/locales/en.json";

const resources = {
    ar: { translation: translationAR },
    en: { translation: translationEN }
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("app-language") || "ar", // اللغة الافتراضية عند فتح الموقع
    fallbackLng: "en", // لو ملحقش يلاقي ترجمة عربي، يعرض الإنجليزي الافتراضي بتاع الكود
    interpolation: {
        escapeValue: false // ريأكت بيحمينا من الـ XSS تلقائياً
    }
});

export default i18n;