import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
    hasAnyPermission,
    hasPermission,
    Permission,
    UserRole,
} from '@/lib/permissions'
import type { RootState } from '@/redux/store'

export function usePermissions() {
    const role = useSelector((state: RootState) => state.auth.role)
    const userName = useSelector((state: RootState) => state.auth.userName)

    const can = useCallback(
        (permission: Permission) => hasPermission(role, permission),
        [role]
    )

    const canAny = useCallback(
        (permissions: Permission[]) => hasAnyPermission(role, permissions),
        [role]
    )

    const isAdmin = role === 'Admin'
    const isEditor = role === 'Editor'
    const isViewer = role === 'Viewer'

    return {
        role: role as UserRole,
        userName,
        can,
        canAny,
        isAdmin,
        isEditor,
        isViewer,
    }
}
