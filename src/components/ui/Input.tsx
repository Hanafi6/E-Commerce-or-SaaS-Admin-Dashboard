import * as React from "react"
import { cn } from "@/lib/utils"

// 1. تعديل الـ Type: بنخليه يرث كل خصائص الـ HTML Input الطبيعي
// وبكده مش هيطلب register ولا هيشتكي من الـ type
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// 2. استخدام React.forwardRef عشان الـ React Hook Form تقدر تملي الـ Focus والـ Validation صح
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref} // 👈 الـ ref هنا مهم جداً عشان الأيرور يختفي
        {...props} // 👈 دي بتفرش الـ onChange والـ value والـ onBlur أوتوماتيك
      />
    )
  }
)
Input.displayName = "Input"

export default Input 