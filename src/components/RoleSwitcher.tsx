import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Shield } from 'lucide-react'
import { USER_ROLES, ROLE_COLORS, ROLE_LABELS, UserRole } from '@/lib/permissions'
import { setRole } from '@/redux/authSlice'
import { usePermissions } from '@/hooks/usePermissions'
import { cn } from '@/lib/utils'

export default function RoleSwitcher() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const { role } = usePermissions()
    const isArabic = i18n.language === 'ar'

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                    {t('Switch role to preview permissions')}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {USER_ROLES.map((item) => {
                    const isActive = role === item
                    const label = isArabic ? ROLE_LABELS[item].ar : ROLE_LABELS[item].en

                    return (
                        <button
                            key={item}
                            type="button"
                            onClick={() => dispatch(setRole(item))}
                            className={cn(
                                'rounded-xl border px-3 py-2.5 text-start transition-all',
                                isActive
                                    ? cn(ROLE_COLORS[item], 'ring-1 ring-primary/40 shadow-sm')
                                    : 'border-border/40 bg-card/40 hover:border-border hover:bg-muted/40'
                            )}
                        >
                            <span className="block text-xs font-bold">{label}</span>
                            <span className="block text-[10px] text-muted-foreground mt-0.5 font-mono">
                                {item}
                            </span>
                        </button>
                    )
                })}
            </div>

            <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">
                {t('Role switch hint')}
            </p>
        </div>
    )
}

export function RoleBadge() {
    const { i18n } = useTranslation()
    const { role } = usePermissions()
    const isArabic = i18n.language === 'ar'
    const label = isArabic ? ROLE_LABELS[role].ar : ROLE_LABELS[role].en

    return (
        <span
            className={cn(
                'hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border',
                ROLE_COLORS[role]
            )}
        >
            {label}
        </span>
    )
}
