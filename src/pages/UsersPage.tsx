import { Users as UsersIcon, UserPlus, ShieldAlert } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">صلاحيات المستخدمين والمشرفين</h2>
          <p className="text-xs text-muted-foreground">التحكم في حسابات الموظفين، وضبط أدوار النظام (Roles).</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer w-fit">
          <UserPlus className="w-4 h-4" />
          <span>دعوة عضو جديد</span>
        </button>
      </div>

      {/* الـ Template المبدئي لإدارة الصلاحيات */}
      <div className="border border-dashed border-border rounded-2xl h-96 flex flex-col items-center justify-center bg-card text-center p-6">
        <div className="p-3 bg-muted rounded-full mb-3 text-muted-foreground">
          <UsersIcon className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold mb-1">جدول الفريق والصلاحيات</h3>
        <p className="text-xs text-muted-foreground max-w-sm mb-4">
          هنا هيتم عرض المشرفين وتحديد صلاحياتهم (Admin, Editor, Viewer).
        </p>
        <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-[11px] px-3 py-1.5 rounded-lg border border-destructive/20 font-medium">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>تنبيه: تعديل الأدوار يغير من صلاحيات الوصول للنظام فوراً.</span>
        </div>
      </div>
    </div>
  );
}