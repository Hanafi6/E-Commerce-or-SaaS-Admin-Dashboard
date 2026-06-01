import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { useGetUsersQuery, useCreateUserMutation } from '@/redux/services/pokemon'
import { userFormSchema, UserFormValues } from '@/validations/authLogin'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import Input from "@/components/ui/Input"

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useMemo(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    return debouncedValue
}

function UserFormDialog() {
    const [open, setOpen] = useState(false)
    const [createUser, { isLoading }] = useCreateUserMutation()

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues: { name: '', email: '', role: 'User' },
    })

    const onSubmit = async (data: UserFormValues) => {
        try {
            await createUser(data).unwrap()
            form.reset()
            setOpen(false) 
        } catch (error) {
            console.error("فشل في إضافة المستخدم:", error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* هنا واخد bg-primary أوتوماتيك من شاد سي ان */}
                <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">إضافة مستخدم جديد +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background border-border text-foreground">
                <DialogHeader>
                    <DialogTitle className="text-foreground">إضافة مستخدم جديد</DialogTitle>
                </DialogHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">الاسم</FormLabel>
                                    <FormControl>
                                        <Input placeholder="مثال: محمود..." className="bg-input border-border text-foreground" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-destructive" />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">البريد الإلكتروني</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="dev@example.com" className="bg-input border-border text-foreground" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-destructive" />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
                            {isLoading ? "جاري الحفظ..." : "حفظ المستخدم"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default function UsersDashboard() {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)

    const { data: users, isLoading, isFetching } = useGetUsersQuery({
        page,
        limit: 5,
        search: debouncedSearch
    })

    const renderedUsers = useMemo(() => {
        if (!users || !users.data) return null
        
        return users.data.map((user) => (
            // الكلاسات هنا بتعتمد على الـ border و الـ hover:bg-accent بتاعة ثيم شاد سي ان
            <tr key={user.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                <td className="p-3 font-medium text-right text-foreground">{user.name}</td>
                <td className="p-3 text-right text-muted-foreground">{user.email}</td>
                <td className="p-3 text-sm text-right text-muted-foreground">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {user.role}
                    </span>
                </td>
            </tr>
        ))
    }, [users])

    return (
        <div className="p-8 space-y-6 max-w-4xl mx-auto" dir="rtl">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">إدارة المستخدمين</h1>
                <UserFormDialog />
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
                <Input
                    placeholder="ابحث بالاسم أو البريد..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm bg-card border-border text-foreground"
                />
                {isFetching && <span className="text-xs text-muted-foreground animate-pulse">جاري التحديث...</span>}
            </div>

            {/* الـ Table متقفل بـ bg-card و border-border */}
            <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
                <table className="w-full border-collapse">
                    <thead className="bg-muted text-muted-foreground font-semibold text-sm border-b border-border">
                        <tr>
                            <th className="p-3 text-right">الاسم</th>
                            <th className="p-3 text-right">الإيميل</th>
                            <th className="p-3 text-right">الصلاحية</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={3} className="text-center p-4 text-muted-foreground">جاري تحميل البيانات...</td></tr>
                        ) : (
                            renderedUsers
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end items-center space-x-2 space-x-reverse pt-2">
                <Button 
                    variant="outline" 
                    className="border-border text-foreground hover:bg-accent"
                    onClick={() => setPage(p => Math.max(p - 1, 1))} 
                    disabled={page === 1}
                >
                    السابق
                </Button>
                <span className="flex items-center px-4 font-medium text-sm text-foreground">صفحة {page} من {users?.pages || 1}</span>
                <Button 
                    variant="outline" 
                    className="border-border text-foreground hover:bg-accent"
                    onClick={() => setPage(p => p + 1)} 
                    disabled={!users || page >= users.pages}
                >
                    التالي
                </Button>
            </div>
        </div>
    )
}