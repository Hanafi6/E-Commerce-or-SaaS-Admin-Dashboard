import { ColumnDef } from "@tanstack/react-table"
import EditabaleCell from "@/components/EditabaleCell"

// 1. تحديد شكل الداتا (الـ Type) اللي الجدول هيتعامل معاها
export interface IUser {
    id: number
    name: string
    role: string
    country: string
    age: number
}

// 2. تعريف الأعمدة وتربيطها بالداتا
export const columns: ColumnDef<IUser>[] = [
    {
        accessorKey: "id",       // لازم يطابق الـ key في الداتا
        header: "ID",
        size: 90,    // الحجم الافتراضي للعمود أول ما الجدول يفتح
        minSize: 80,  // أقصى حد للتصغير (مستحيل يمسك الماوس ويصغره أصغر من كده)
        maxSize: 300, // أقصى حد للتكبير     // الاسم اللي هيظهر للمستخدم فوق في الجدول
    },
    {
        accessorKey: "name",     // هيقرأ Vince Green مثلاً
        header: "Name",
        size: 90,    // الحجم الافتراضي للعمود أول ما الجدول يفتح
        minSize: 80,  // أقصى حد للتصغير (مستحيل يمسك الماوس ويصغره أصغر من كده)
        maxSize: 300, // أقصى حد للتكبير
    },
    {
        accessorKey: "role",     // هيقرأ Admin أو User
        header: "Role",
        size: 90,    // الحجم الافتراضي للعمود أول ما الجدول يفتح
        minSize: 80,  // أقصى حد للتصغير (مستحيل يمسك الماوس ويصغره أصغر من كده)
        maxSize: 300, // أقصى حد للتكبير
        cell: ({ row }) => {
            const role = row.getValue("role") as string
            return (
                <span className={role === "Admin" ? "text-red-500" : "text-green-500"}>
                    {role}
                </span>
            )
        }
    },

    {
        accessorKey: "country",  // هيقرأ USA
        header: "Country",
        size: 90,    // الحجم الافتراضي للعمود أول ما الجدول يفتح
        minSize: 80,  // أقصى حد للتصغير (مستحيل يمسك الماوس ويصغره أصغر من كده)
        maxSize: 300, // أقصى حد للتكبير
    },
    {
        accessorKey: "age",      // هيقرأ 38
        header: "Age",
        cell: EditabaleCell,
        size: 90,    // الحجم الافتراضي للعمود أول ما الجدول يفتح
        minSize: 80,  // أقصى حد للتصغير (مستحيل يمسك الماوس ويصغره أصغر من كده)
        maxSize: 50, // أقصى حد للتكبير
        enableSorting: true, // كده العمود ده بقى قابل للترتيب بالضغط عليه!
    },
    {
        id: "actions",
        header: "العمليات",
        cell: ({ row }) => {
            let name: string = row.original.name.split(" ")[0];
            if (row.original.role.toLowerCase() === "user") {
                return < button onClick={() => console.log(`deleted ${name}`)}> حذف</button >
            }

        }
    }
]