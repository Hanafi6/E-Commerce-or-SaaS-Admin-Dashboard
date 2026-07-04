import { Pencil, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePermissions } from '@/hooks/usePermissions'
import { Permission } from '@/lib/permissions'
import { cn } from '@/lib/utils'

interface TableRowActionsProps {
    itemLabel: string
    editPermission: Permission
    deletePermission: Permission
    onEdit?: (label: string) => void
    onDelete?: (label: string) => void
    onView?: (label: string) => void
    className?: string
}

export default function TableRowActions({
    itemLabel,
    editPermission,
    deletePermission,
    onEdit,
    onDelete,
    onView,
    className,
}: TableRowActionsProps) {
    const { can, isViewer } = usePermissions()

    const canEdit = can(editPermission)
    const canDelete = can(deletePermission)
    const showViewOnly = isViewer || (!canEdit && !canDelete)

    if (!canEdit && !canDelete && !showViewOnly) {
        return null
    }

    return (
        <div className={cn('flex items-center justify-end gap-1', className)}>
            {showViewOnly && onView && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    title="عرض التفاصيل"
                    onClick={() => onView(itemLabel)}
                >
                    <Eye className="h-3.5 w-3.5" />
                </Button>
            )}

            {canEdit && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-sky-500 hover:text-sky-400 hover:bg-sky-500/10"
                    title="تعديل"
                    onClick={() => onEdit?.(itemLabel)}
                >
                    <Pencil className="h-3.5 w-3.5" />
                </Button>
            )}

            {canDelete && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                    title="حذف"
                    onClick={() => onDelete?.(itemLabel)}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            )}
        </div>
    )
}
