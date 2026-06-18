import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Users, AlertTriangle, CheckCircle2, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/card"; // أو من المكان اللي بتستورد منه الأزرار

interface Notification {
    id: string;
    title: string;
    description: string;
    type: "order" | "user" | "system" | "success";
    createdAt: string;
    read: boolean;
}

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
    notification,
    onMarkAsRead,
    onDelete,
}) => {
    // تحديد الأيقونة واللون بناءً على نوع الإشعار باستخدام متغيرات شاد سي إن
    const getIconAndColor = () => {
        switch (notification.type) {
            case "order":
                return {
                    icon: ShoppingBag,
                    bgClass: "bg-primary/10 text-primary",
                };
            case "user":
                return {
                    icon: Users,
                    bgClass: "bg-blue-500/10 text-blue-500", // لو عندك متغير للـ info ممكن تستخدمه
                };
            case "system":
                return {
                    icon: AlertTriangle,
                    bgClass: "bg-destructive/10 text-destructive",
                };
            default:
                return {
                    icon: CheckCircle2,
                    bgClass: "bg-emerald-500/10 text-emerald-500",
                };
        }
    };

    const { icon: Icon, bgClass } = getIconAndColor();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 bg-card ${notification.read ? "border-border/50 opacity-75" : "border-primary/30 shadow-sm"
                }`}
        >
            <div className="flex items-start gap-3 text-start">
                {/* الأيقونة الجانبية */}
                <div className={`p-2.5 rounded-xl shrink-0 ${bgClass}`}>
                    <Icon className="w-5 h-5" />
                </div>

                {/* تفاصيل الإشعار */}
                <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`text-sm font-semibold text-foreground m-0 ${!notification.read && "text-primary"}`}>
                            {notification.title}
                        </h4>
                        {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed m-0">
                        {notification.description}
                    </p>
                    <span className="block text-[10px] text-muted-foreground/70 pt-1" dir="ltr">
                        {notification.createdAt}
                    </span>
                </div>
            </div>

            {/* أزرار التحكم اللطيفة */}
            <div className="flex items-center gap-1 shrink-0" dir="ltr">
                <button
                    onClick={() => onDelete(notification.id)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    title="حذف"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
                {!notification.read && (
                    <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="text-[11px] font-medium px-2 py-1 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                    >
                        قراءة
                    </button>
                )}
            </div>
        </motion.div>
    );
};