export type UserRole = 'Admin' | 'Editor' | 'Viewer'

export type Permission =
    | 'users:read'
    | 'users:create'
    | 'users:edit'
    | 'users:delete'
    | 'products:read'
    | 'products:create'
    | 'products:edit'
    | 'products:delete'
    | 'orders:read'
    | 'settings:read'
    | 'settings:manage'
    | 'notifications:read'

export const USER_ROLES: UserRole[] = ['Admin', 'Editor', 'Viewer']

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    Admin: [
        'users:read',
        'users:create',
        'users:edit',
        'users:delete',
        'products:read',
        'products:create',
        'products:edit',
        'products:delete',
        'orders:read',
        'settings:read',
        'settings:manage',
        'notifications:read',
    ],
    Editor: [
        'users:read',
        'products:read',
        'products:create',
        'products:edit',
        'orders:read',
        'settings:read',
        'notifications:read',
    ],
    Viewer: [
        'users:read',
        'products:read',
        'orders:read',
        'settings:read',
        'notifications:read',
    ],
}

export const ROLE_LABELS: Record<UserRole, { ar: string; en: string }> = {
    Admin: { ar: 'مدير النظام', en: 'Administrator' },
    Editor: { ar: 'محرر', en: 'Editor' },
    Viewer: { ar: 'مشاهد', en: 'Viewer' },
}

export const ROLE_COLORS: Record<UserRole, string> = {
    Admin: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    Editor: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    Viewer: 'bg-muted text-muted-foreground border-border',
}

export function getPermissionsForRole(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role]
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
    return ROLE_PERMISSIONS[role].includes(permission)
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
    return permissions.some((permission) => hasPermission(role, permission))
}

export const ROUTE_PERMISSIONS: Record<string, Permission> = {
    '/home': 'orders:read',
    '/products': 'products:read',
    '/orders': 'orders:read',
    '/users': 'users:read',
    '/settings': 'settings:read',
    '/notifications': 'notifications:read',
}
