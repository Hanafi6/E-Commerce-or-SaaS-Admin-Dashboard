import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckSquare, Trash2, BellOff } from "lucide-react";
import { NotificationItem } from "@/components/NotificationItem";

const initialNotifications = [
    {
        id: "1",
        title: "طلب جديد بقيمة $150.00",
        description: "قام المستخدم أحمد محمود بشراء منتج 'Wireless Earbuds'، الطلب في انتظار التجهيز.",
        type: "order" as const,
        createdAt: "منذ دقيقتين",
        read: false,
    },
    {
        id: "2",
        title: "مستخدم جديد انضم للمتجر",
        description: "سجل مستخدم جديد بريد إلكتروني m***@example.com في المنصة الآن.",
        type: "user" as const,
        createdAt: "منذ ساعة",
        read: false,
    },
    {
        id: "3",
        title: "تنبيه: نفاد كمية المخزون!",
        description: "المنتج 'Smart Watch' وصل للحد الأدنى في المخزون (باقي قطعتين فقط).",
        type: "system" as const,
        createdAt: "منذ 5 ساعات",
        read: true,
    },
    {
        id: "4",
        title: "تم تسوية المبيعات الأسبوعية",
        description: "تم تحويل الأرباح بنجاح إلى حسابك البنكي وتحديث الإحصائيات.",
        type: "success" as const,
        createdAt: "أمس في 10:30 م",
        read: true,
    },
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

    // تصفية الإشعارات بناءً على التاب النشط
    const filteredNotifications = notifications.filter((n) =>
        activeTab === "all" ? true : !n.read
    );

    const unreadCount = notifications.filter((n) => !n.read).length;

    // العمليات (Handlers)
    const handleMarkAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const handleDelete = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const handleMarkAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    return (
        <section className="space-y-6 text-start max-w-4xl mx-auto" dir="rtl">
            {/* الهيدر العلوي */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-foreground m-0">مركز الإشعارات</h2>
                        {unreadCount > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                                {unreadCount} جديد
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">تابع آخر الأنشطة، الطلبات، وتنبيهات النظام اللحظية.</p>
                </div>

                {/* أزرار التحكم السريع */}
                {notifications.length > 0 && (
                    <div className="flex items-center gap-2 text-xs">
                        <button
                            onClick={handleMarkAllAsRead}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border hover:bg-accent text-muted-foreground hover:text-foreground transition-all"
                        >
                            <CheckSquare className="w-3.5 h-3.5" />
                            تعيين كمقروء
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-destructive/20 text-destructive/90 hover:bg-destructive/10 transition-all"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            مسح الكل
                        </button>
                    </div>
                )}
            </div>

            {/* التابات والفلترة */}
            <div className="flex items-center gap-2 border-b border-border/40 pb-2">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`px-4 py-2 text-xs font-medium border-b-2 transition-all ${activeTab === "all"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    الكل ({notifications.length})
                </button>
                <button
                    onClick={() => setActiveTab("unread")}
                    className={`px-4 py-2 text-xs font-medium border-b-2 transition-all ${activeTab === "unread"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    غير المقروء ({unreadCount})
                </button>
            </div>

            {/* قائمة الإشعارات مع تأثيرات الحركة */}
            <div className="space-y-3 min-h-[200px]">
                <AnimatePresence mode="popLayout">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={handleMarkAsRead}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        /* حالة عدم وجود إشعارات */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-48 w-full border border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center p-6"
                        >
                            <div className="p-3 rounded-full bg-muted text-muted-foreground mb-3">
                                <BellOff className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground m-0">صندوق الإشعارات فارغ</h3>
                            <p className="text-xs text-muted-foreground max-w-[280px] mt-1">
                                {activeTab === "unread"
                                    ? "رائع! لقد قرأت جميع الإشعارات الحالية."
                                    : "لا توجد أي إشعارات أو تنبيهات في الوقت الحالي."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}