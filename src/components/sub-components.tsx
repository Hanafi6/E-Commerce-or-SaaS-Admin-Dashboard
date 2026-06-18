// components/DashboardHeader/index.tsx
import React from 'react'
import { RefreshCcw } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // الدالة الأساسية في شاد سي ان لدمج الكلاسات

// 1. تعريف الـ Variants باستخدام الـ cva بتاعة شاد سي ان
const dashboardHeaderVariants = cva(
    "w-full flex flex-col bg-transparent text-foreground text-start",
    {
        variants: {
            size: {
                default: "p-6 gap-6",
                sm: "p-4 gap-4",
                lg: "p-8 gap-8",
            },
            border: {
                none: "",
                bottom: "border-b border-border pb-6",
            }
        },
        defaultVariants: {
            size: "default",
            border: "none",
        },
    }
);

// دمج الـ Props الأصلية مع الـ Variants الـ تايبر سكريبت المنتجة من cva
interface DashboardHeaderProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardHeaderVariants> {
    children: React.ReactNode;
}

export default function DashboardHeader({
    children,
    size,
    border,
    className,
    ...props
}: DashboardHeaderProps) {
    return (
        <div
            className={cn(dashboardHeaderVariants({ size, border }), className)}
            {...props}
        >
            {children}
        </div>
    )
}

// --- 2. مكون العنوان والوصف (Title) ---
interface HeaderTitleProps {
    title: string;
    description: string;
    onRefetch?: () => void;
    actionButtonText?: string;
    onActionClick?: () => void;
    actionIcon?: React.ReactNode;
}

DashboardHeader.Title = function DashboardHeaderTitle({
    title,
    description,
    onRefetch,
    actionButtonText,
    onActionClick,
    actionIcon
}: HeaderTitleProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                    {title}
                </h2>
                <p className="text-xs text-muted-foreground max-w-md">
                    {description}
                </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
                {onRefetch && (
                    <button
                        onClick={onRefetch}
                        className="border border-border bg-card hover:bg-muted text-card-foreground p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 flex items-center justify-center h-9 w-9"
                    >
                        <RefreshCcw className="h-4 w-4" />
                    </button>
                )}
                {actionButtonText && (
                    <button
                        onClick={onActionClick}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer h-9 shadow-sm active:scale-95"
                    >
                        {actionIcon}
                        <span>{actionButtonText}</span>
                    </button>
                )}
            </div>
        </div>
    )
}

interface HeaderContentProps {
    children: React.ReactNode;
}

DashboardHeader.Content = function DashboardHeaderContent({ children }: HeaderContentProps) {
    return (
        <div className="w-full  ">
            {children}
        </div>
    )
}