import { z } from 'zod'

export const userFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "الاسم لازم يكون أكتر من حرفين يا رئيس" })
        .max(50, { message: "الاسم طويل زيادة عن اللزوم (الحد الأقصى 50 حرف)" })
        .trim(),
        
    email: z
        .string()
        .min(1, { message: "البريد الإلكتروني مطلوب" })
        .email({ message: "صيغة البريد الإلكتروني مش مظبوطة" })
        .trim()
        .toLowerCase(), 
        
    role: z.enum(['Admin', 'User', 'Editor'], {
        message: "برجاء اختيار صلاحية صالحة من القائمة",    }),
})

export type UserFormValues = z.infer<typeof userFormSchema>


export const editUserSchema = userFormSchema.extend({
    id: z.union([z.string(), z.number()], {
        message: "معرف المستخدم (ID) مطلوب لإتمام عملية التعديل"
    })
})

export type EditUserValues = z.infer<typeof editUserSchema>