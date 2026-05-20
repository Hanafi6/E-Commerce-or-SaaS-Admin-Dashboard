import * as React from "react";
import { cn } from '@/lib/utils';
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";


const Variants = cva(`
"p-[5px] border mt-1 flex items-center justify-evenly h-[45px] w-full md:w-[50%] lg:w-[30%]",    
`, {
    variants: {
        variant: {
            default: "text-[#E1DCC9] bg-[#1F150C]",
            success: "text[#2C5EAD] bg-[#C4E2F5]",
            error: "bg-[#D62828] text-[#FCBF49]",
        },
        size: {
            default: "text-base",
            sm: "text-sm",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export interface ParagraphProps
    extends React.ComponentProps<"p">,
    VariantProps<typeof Variants> {
    asChild?: boolean;
}

function Paragraph({
    children,
    className,
    size,
    variant,
    asChild = false,
    ...props
}: ParagraphProps) {
    const P = asChild ? Slot : "p";

    return (
        <P
            data-slot="paragraph"
            data-variant={variant}
            data-size={size}
            className={cn(Variants({ variant, size }), className)}
            {...props}
        >
            {children}
        </P>
    );
}

export default Paragraph;