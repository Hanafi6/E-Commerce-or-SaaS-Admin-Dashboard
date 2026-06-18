import { motion } from "framer-motion";
import { MoveLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[75vh] w-full flex flex-col items-center justify-center p-6 text-center" dir="ltr">

            {/* أنيميشن الـ Container الأساسي */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="flex flex-col items-center"
            >
                {/* رقم 404 كبير وبيدمج مع الخلفية بشكل شيك */}
                <h1 className="text-9xl font-extrabold text-muted-foreground/10 select-none tracking-tighter leading-none">
                    404
                </h1>

                {/* العنوان - من غير absolute عشان ميتداخلش */}
                <h2 className="text-xl font-bold text-foreground mt-4 tracking-tight">
                    Oops! Page Not Found
                </h2>

                {/* الوصف */}
                <p className="mt-2 text-xs text-muted-foreground max-w-sm leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
            </motion.div>

            {/* أزرار التحكم */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center"
            >
                {/* زرار الرجوع */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-border bg-card hover:bg-muted text-foreground transition-all cursor-pointer shadow-sm active:scale-95"
                >
                    <MoveLeft className="w-3.5 h-3.5" />
                    <span>Go Back</span>
                </button>

                {/* زرار العودة للرئيسية - واخد الـ Brand Color بتاعك */}
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer shadow-sm active:scale-95"
                >
                    <Home className="w-3.5 h-3.5" />
                    <span>Back to Dashboard</span>
                </button>
            </motion.div>
        </div>
    );
}