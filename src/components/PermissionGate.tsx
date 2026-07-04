import { Permission } from '@/lib/permissions'
import { usePermissions } from '@/hooks/usePermissions'

interface PermissionGateProps {
    permission?: Permission
    permissions?: Permission[]
    requireAll?: boolean
    fallback?: React.ReactNode
    children: React.ReactNode
}

export default function PermissionGate({
    permission,
    permissions = [],
    requireAll = false,
    fallback = null,
    children,
}: PermissionGateProps) {
    const { can, canAny } = usePermissions()

    const checks = permission ? [permission, ...permissions] : permissions

    if (checks.length === 0) {
        return <>{children}</>
    }

    const allowed = requireAll
        ? checks.every((item) => can(item))
        : canAny(checks)

    if (!allowed) {
        return <>{fallback}</>
    }

    return <>{children}</>
}
