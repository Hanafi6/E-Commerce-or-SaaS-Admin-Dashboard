import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PageLoader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
        >
            <div className="flex flex-col items-center gap-3 p-6 bg-card border border-border rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-200">
                {/* لودر بيلف بـ Lucide أو تقدر تعمله بـ Framer Motion براحتك */}
                <Loader2 className="w-9 h-9 animate-spin text-primary" />
                <p className="text-xs font-bold text-foreground tracking-wide">
                    Loading Page...
                </p>

                <span>لو كان عند اي مشكله ممكن تكلمني علي تتوصل معايا </span>
            </div>
        </motion.div>
    );
}