import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserRole } from '@/lib/permissions'

const STORAGE_KEY = 'app-user-role'

function loadRole(): UserRole {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'Admin' || stored === 'Editor' || stored === 'Viewer') {
        return stored
    }
    return 'Admin'
}

interface AuthState {
    role: UserRole
    userName: string
}

const initialState: AuthState = {
    role: loadRole(),
    userName: 'Mahmoud',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<UserRole>) => {
            state.role = action.payload
            localStorage.setItem(STORAGE_KEY, action.payload)
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
        },
    },
})

export const { setRole, setUserName } = authSlice.actions
export default authSlice.reducer
