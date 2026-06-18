// import { useState } from "react";
// import { useGetOrdersQuery } from "@/redux/services/orderSlice";
// import {
//   ClipboardList,
//   CheckCircle2,
//   Clock,
//   MoreVertical,
//   Trash2,
//   Plus,
//   AlertCircle,
//   ShoppingBag,
//   User
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import Input from "@/components/ui/Input";
// import { Label } from "@/components/ui/label";

// interface Order {
//   customerName: string;
//   id: string | number;
//   status: "Pending" | "Success" | "Failed" | string;
//   time: string;
//   totalPrice: number;
//   userId: number;
// }

// export default function OdrersPage() {
//   const { data: orders = [], isError, isLoading } = useGetOrdersQuery();
//   const [openCreateDialog, setOpenCreateDialog] = useState(false);
//   const [newOrder, setNewOrder] = useState({ customerName: "", totalPrice: "", userId: "" });

//   const pendingOrders = orders.filter((o: Order) => o.status?.toLowerCase() === "pending").length;
//   const failedOrders = orders.filter((o: Order) => o.status?.toLowerCase() === "failed").length;
//   const successOrders = orders.filter((o: Order) => o.status?.toLowerCase() === "success" || o.status === "Completed").length;

//   const handleCreateOrder = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("إنشاء طلب جديد:", { ...newOrder, id: orders.length + 1, time: new Date().toLocaleDateString(), status: "Pending" });
//     setOpenCreateDialog(false);
//     setNewOrder({ customerName: "", totalPrice: "", userId: "" });
//   };

//   if (isLoading) return <div className="text-center py-12 text-xs text-muted-foreground animate-pulse font-mono">Loading sales records feed...</div>;
//   if (isError) return <div className="text-center py-12 text-xs text-destructive font-mono">Error syncing with API connection.</div>;


//   orders.map(e => {
//     console.log(e.status)
//   })
//   return (
//     <div className="space-y-6" dir="rtl">

//       {/* الهيدر العلوي */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div className="space-y-1">
//           <h2 className="text-lg font-bold tracking-tight text-foreground font-mono">
//             سجلات حركات البيع والطلبات
//           </h2>
//           <p className="text-xs text-muted-foreground font-mono">
//             Recent Activity Feed / Live Sales Tracker
//           </p>
//         </div>

//         {/* زر إنشاء طلب */}
//         <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
//           <DialogTrigger asChild>
//             <Button size="sm" variant="outline" className="gap-2 border-border bg-card/50 hover:bg-muted text-xs font-mono">
//               <Plus className="w-3.5 h-3.5" />
//               CREATE_NEW_ORDER
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px] font-mono" dir="rtl">
//             <DialogHeader>
//               <DialogTitle className="text-start text-sm font-bold">إضافة حركة بيع جديدة</DialogTitle>
//               <DialogDescription className="text-start text-xs text-muted-foreground">
//                 أدخل بيانات الفاتورة المباشرة لحقنها في النظام.
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleCreateOrder} className="space-y-4 py-2">
//               <div className="space-y-1 text-start">
//                 <Label htmlFor="customerName" className="text-xs">Customer Name</Label>
//                 <Input id="customerName" value={newOrder.customerName} onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })} placeholder="Ahmad S." required />
//               </div>
//               <div className="space-y-1 text-start">
//                 <Label htmlFor="totalPrice" className="text-xs">Ticket Size ($)</Label>
//                 <Input id="totalPrice" type="number" value={newOrder.totalPrice} onChange={(e) => setNewOrder({ ...newOrder, totalPrice: e.target.value })} placeholder="0.00" required />
//               </div>
//               <div className="space-y-1 text-start">
//                 <Label htmlFor="userId" className="text-xs">User ID</Label>
//                 <Input id="userId" type="number" value={newOrder.userId} onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })} placeholder="1052" required />
//               </div>
//               <DialogFooter className="pt-2">
//                 <Button type="submit" size="sm" className="w-full text-xs">EXECUTE_INSERT</Button>
//               </DialogFooter>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* صف الإحصائيات العلوي بنفس طراز الكروت الثلاثية الفوقية */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" dir="ltr">
//         <div className="bg-card/40 p-4 rounded-xl border border-border flex items-center justify-between shadow-sm">
//           <div className="space-y-1 text-left font-mono">
//             <span className="text-[11px] text-muted-foreground">Pending Approval</span>
//             <h4 className="text-base font-bold text-amber-500">{pendingOrders} Orders</h4>
//           </div>
//           <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg"><Clock className="w-4 h-4" /></div>
//         </div>
//         <div className="bg-card/40 p-4 rounded-xl border border-border flex items-center justify-between shadow-sm">
//           <div className="space-y-1 text-left font-mono">
//             <span className="text-[11px] text-muted-foreground">Failed Gateway</span>
//             <h4 className="text-base font-bold text-destructive">{failedOrders} Errors</h4>
//           </div>
//           <div className="p-2 bg-destructive/10 text-destructive rounded-lg"><AlertCircle className="w-4 h-4" /></div>
//         </div>
//         <div className="bg-card/40 p-4 rounded-xl border border-border flex items-center justify-between shadow-sm">
//           <div className="space-y-1 text-left font-mono">
//             <span className="text-[11px] text-muted-foreground">Completed Sales</span>
//             <h4 className="text-base font-bold text-emerald-500">{successOrders} Ready</h4>
//           </div>
//           <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><CheckCircle2 className="w-4 h-4" /></div>
//         </div>
//       </div>

//       {/* الحاوية الكبيرة الرئيسية للملف (الـ Feed List Container) */}
//       <Card className="bg-card/40 border-border shadow-sm overflow-hidden">
//         <CardHeader className="border-b border-border/60 py-4 px-5">
//           <CardTitle className="text-sm font-semibold font-mono text-start flex items-center gap-2">
//             <ClipboardList className="w-4 h-4 text-muted-foreground" />
//             Recent Activity Feed
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-0 divide-y divide-border/50">
//           {orders.length === 0 ? (
//             <div className="py-12 text-center text-xs text-muted-foreground font-mono">
//               [SYSTEM_EMPTY]: No active orders in feed.
//             </div>
//           ) : (
//             orders.map((order: Order) => {
//               const statusLower = order.status?.toLowerCase();

//               // تحديد كود اللون للأيقونات والنصوص بناءً على الحالة
//               let statusColorClass = "text-amber-500 bg-amber-500/10";
//               let badgeVariant = "bg-amber-500/10 text-amber-500 hover:bg-amber-500/10 border-none text-[10px] font-mono";
//               let statusLabel = "Pending";

//               if (statusLower === "failed") {
//                 statusColorClass = "text-destructive bg-destructive/10";
//                 badgeVariant = "bg-destructive/10 text-destructive hover:bg-destructive/10 border-none text-[10px] font-mono";
//                 statusLabel = "Error";
//               } else if (statusLower === "success" || statusLower === "completed") {
//                 statusColorClass = "text-emerald-500 bg-emerald-500/10";
//                 badgeVariant = "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 border-none text-[10px] font-mono";
//                 statusLabel = "Completed";
//               }

//               return (
//                 <div
//                   key={order.id}
//                   className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-muted/30 transition-colors"
//                   dir="ltr" // ليكون ممتد من اليسار لليمين كالأكواد والسجلات الموضحة بصورتك
//                 >
//                   {/* الجانب الأيسر: الأيقونة + نص السجل العريض */}
//                   <div className="flex items-center gap-3 min-w-0 flex-1">
//                     <div className={`p-2 rounded-xl shrink-0 ${statusColorClass}`}>
//                       <ShoppingBag className="w-4 h-4" />
//                     </div>
//                     <div className="text-xs font-mono text-foreground/90 truncate space-y-0.5 text-left">
//                       <div>
//                         New order <span className="text-muted-foreground font-semibold">#{order.id}</span> from customer
//                         <span className="text-foreground font-semibold"> "{order.customerName || `User ${order.userId}`}"</span>.
//                       </div>
//                       <div className="text-[11px] text-muted-foreground flex items-center gap-3">
//                         <span className="flex items-center gap-1"><User className="w-3 h-3" /> User ID: {order.userId}</span>
//                         <span className="text-foreground font-bold">Value: ${order.totalPrice?.toLocaleString()}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* الجانب الأيمن: الوقت + البادج + أزرار التحكم المخفية */}
//                   <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-none pt-2 sm:pt-0 border-border/40">
//                     <span className="text-[11px] text-muted-foreground font-mono">
//                       {order.time}
//                     </span>

//                     <div className="flex items-center gap-2">
//                       <Badge className={badgeVariant}>
//                         {statusLabel}
//                       </Badge>

//                       {/* الـ Context Menu لإجراء الـ Update والـ Delete */}
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-lg">
//                             <MoreVertical className="w-3.5 h-3.5" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="text-xs font-mono">
//                           <DropdownMenuItem onClick={() => console.log(`Approve ${order.id}`)} className="gap-2 cursor-pointer">
//                             <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Accept Order
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => console.log(`Hold ${order.id}`)} className="gap-2 cursor-pointer">
//                             <Clock className="w-3.5 h-3.5 text-amber-500" /> Hold to Pending
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => console.log(`Delete ${order.id}`)} className="text-destructive gap-2 cursor-pointer focus:bg-destructive/10 focus:text-destructive">
//                             <Trash2 className="w-3.5 h-3.5" /> Purge Record
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </div>

//                 </div>
//               );
//             })
//           )}
//         </CardContent>
//       </Card>

//     </div>
//   );
// }


import React, { useMemo, useState } from "react";
import { useGetOrdersQuery } from "@/redux/services/orderSlice";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  ShoppingBag,
  DollarSign,
  Clock,
  Truck,
  Eye,
  Edit2,
  Plus,
  Search,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 1️⃣ تعريف نوع البيانات (Order Interface) بناءً على حقول السيرفر الحقيقية
interface Order {
  id: number;
  customerName: string;
  userId: number;
  totalPrice: number;
  time: string;
  status: "Pending" | "Success" | "Failed" | string;
}

const columnHelper = createColumnHelper<Order>();

export default function OrdersPage() {
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery();
  const [globalFilter, setGlobalFilter] = useState("");

  // 2️⃣ حساب الإحصائيات العلوية ديناميكياً من الداتا الحقيقية
  const totalOrdersCount = orders.length;
  const totalSalesAmount = orders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);
  const pendingCount = orders.filter((o) => o.status?.toLowerCase() === "pending").length;
  const processingCount = orders.filter((o) => o.status?.toLowerCase() === "success").length; // ممثلة كـ تم الشحن/مكتمل

  // 3️⃣ إعداد أعمدة الجدول بتصميم مطابق للصورة تماماً (RTL مع الهيدر الإنجليزي والأيقونات)
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => <span className="font-mono text-xs">Order ID</span>,
        cell: (info) => <span className="font-mono text-muted-foreground">{info.getValue()}</span>,
      }),
      columnHelper.accessor("customerName", {
        header: () => <span>اسم العميل</span>,
        cell: (info) => (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground border border-border">
              {info.getValue()?.charAt(0) || "U"}
            </div>
            <span className="font-medium text-foreground">{info.getValue() || `User ${info.row.original.userId}`}</span>
          </div>
        ),
      }),
      columnHelper.accessor("userId", {
        header: () => <span>رمز المنتج</span>,
        cell: (info) => <span className="font-mono text-xs text-muted-foreground">SKU##{info.getValue()}</span>,
      }),
      columnHelper.accessor("time", {
        header: () => <span>تاريخ الطلب</span>,
        cell: (info) => <span className="font-mono text-xs text-muted-foreground">{info.getValue()}</span>,
      }),
      columnHelper.accessor("totalPrice", {
        header: () => <span>السعر الإجمالي</span>,
        cell: (info) => <span className="font-mono font-medium">${Number(info.getValue()).toFixed(2)}</span>,
      }),
      columnHelper.accessor("status", {
        header: () => <span>الحالة</span>,
        cell: (info) => {
          const status = info.getValue()?.toLowerCase();
          if (status === "success" || status === "completed") {
            return <Badge className="bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-950/40 text-xs px-2.5 py-0.5 rounded-md">مكتمل</Badge>;
          }
          if (status === "pending") {
            return <Badge className="bg-amber-950/40 text-amber-400 border border-amber-500/30 hover:bg-amber-950/40 text-xs px-2.5 py-0.5 rounded-md">قيد الانتظار</Badge>;
          }
          if (status === "failed") {
            return <Badge className="bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-950/40 text-xs px-2.5 py-0.5 rounded-md">ملغى</Badge>;
          }
          return <Badge className="bg-blue-950/40 text-blue-400 border border-blue-500/30 hover:bg-blue-950/40 text-xs px-2.5 py-0.5 rounded-md">تم الشحن</Badge>;
        },
      }),
      columnHelper.display({
        id: "actions",
        header: () => <span className="font-mono text-xs">Actions</span>,
        cell: () => (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
              <Eye className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
              <Edit2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ),
      }),
    ],
    []
  );

  // 4️⃣ تشغيل خط إنتاج جداول TanStack
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  if (isLoading) return <div className="p-6 text-center text-xs font-mono text-muted-foreground">Syncing dashboard layout...</div>;
  if (isError) return <div className="p-6 text-center text-xs text-destructive font-mono">Error building data table grid.</div>;

  return (
    <div className="space-y-5 px-2 text-start" dir="rtl">

      {/* عنوان الصفحة الرئيسي */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground font-mono">Orders</h2>
      </div>

      {/* 2️⃣ قسم كروت المؤشرات الأربعة العلوية (KPI Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" dir="ltr">

        {/* كارت إجمالي الطلبات */}
        <div className="bg-[#0b0f12]/60 border border-border/60 p-4 rounded-xl flex items-center justify-between backdrop-blur-md">
          <div className="space-y-1 text-left font-mono">
            <span className="text-xs text-muted-foreground">Total orders</span>
            <h4 className="text-xl font-bold tracking-tight">{totalOrdersCount}</h4>
          </div>
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20"><ShoppingBag className="w-4 h-4" /></div>
        </div>

        {/* كارت إجمالي المبيعات */}
        <div className="bg-[#0b0f12]/60 border border-border/60 p-4 rounded-xl flex items-center justify-between backdrop-blur-md">
          <div className="space-y-1 text-left font-mono">
            <span className="text-xs text-muted-foreground">Total sales</span>
            <h4 className="text-xl font-bold tracking-tight">${totalSalesAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
          </div>
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20"><DollarSign className="w-4 h-4" /></div>
        </div>

        {/* كارت قيد الانتظار */}
        <div className="bg-[#0b0f12]/60 border border-border/60 p-4 rounded-xl flex items-center justify-between backdrop-blur-md">
          <div className="space-y-1 text-left font-mono">
            <span className="text-xs text-muted-foreground">Pending orders</span>
            <h4 className="text-xl font-bold tracking-tight">{pendingCount}</h4>
          </div>
          <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20"><Clock className="w-4 h-4" /></div>
        </div>

        {/* كارت تحت المعالجة */}
        <div className="bg-[#0b0f12]/60 border border-border/60 p-4 rounded-xl flex items-center justify-between backdrop-blur-md">
          <div className="space-y-1 text-left font-mono">
            <span className="text-xs text-muted-foreground">Processing orders</span>
            <h4 className="text-xl font-bold tracking-tight">{processingCount}</h4>
          </div>
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20"><Truck className="w-4 h-4" /></div>
        </div>

      </div>

      {/* 3️⃣ شريط الفلاتر والأدوات المطور بالكامل (Filters Control Bar) */}
      <div className="bg-[#0b0f12]/40 border border-border/60 p-2 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">

        {/* الجانب الأيمن: فلاتر البحث والقوائم المنسدلة */}
        <div className="flex flex-wrap items-center gap-2 flex-1">

          {/* حقل البحث عن العميل مع أيقونة منسقة داخلياً */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute right-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="اسم العميل"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="bg-[#070a0c] border-border/40 pr-9 text-xs h-9 font-mono text-start"
            />
          </div>

          {/* فلتر التاريخ */}
          <Button variant="outline" size="sm" className="bg-[#070a0c] border-border/40 text-xs h-9 gap-2 font-mono px-3 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>2024-9 — 2024-12</span>
          </Button>

          {/* فلتر السعر الإجمالي */}
          <Button variant="outline" size="sm" className="bg-[#070a0c] border-border/40 text-xs h-9 gap-4 px-3 text-muted-foreground">
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span>السعر الإجمالي</span>
          </Button>

          {/* فلتر الحالة */}
          <Button variant="outline" size="sm" className="bg-[#070a0c] border-border/40 text-xs h-9 gap-4 px-3 text-muted-foreground">
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span>الحالة</span>
            <span className="text-foreground font-medium border-r border-border/60 pr-2 mr-1">Status</span>
          </Button>

        </div>

        {/* الجانب الأيسر: زر الإضافة الرئيسي والأنيق */}
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 h-9 text-xs font-semibold px-4 rounded-lg shadow-md shrink-0">
          <Plus className="w-4 h-4" />
          إنشاء طلب جديد
        </Button>

      </div>

      {/* 4️⃣ جدول بيانات الفواتير الاحترافي (TanStack Data Table Container) */}
      <div className="bg-[#0b0f12]/40 border border-border/50 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/10 border-b border-border/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-start text-muted-foreground text-xs font-semibold h-10 py-2">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-xs text-muted-foreground font-mono">
                  [EMPTY_DATAGRID]: No match found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors h-12">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2 text-xs">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 5️⃣ أزرار الترقيم السفلية لـ TanStack Table */}
      <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground pt-1" dir="ltr">
        <span className="text-start block w-full text-[10px] md:text-xs">
          Active Page: <span className="text-foreground font-bold">1</span> of 2 | Total items: <span className="text-foreground font-bold">{totalOrdersCount}</span>
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <Button variant="outline" size="sm" className="h-7 text-[10px] bg-card/40 border-border/60" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
          <Button variant="outline" size="sm" className="h-7 text-[10px] bg-card/40 border-border/60" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
        </div>
      </div>

    </div>
  );
}