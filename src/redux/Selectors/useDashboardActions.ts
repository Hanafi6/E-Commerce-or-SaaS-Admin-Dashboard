// src/hooks/useDashboardActions.ts
import { useAppDispatch } from "@/redux/hoos";
import { apiSlice } from "@/redux/services/apiSlice";

export const useDashboardActions = () => {
    const dispatch = useAppDispatch();

    const refreshAllData = () => {
        dispatch(apiSlice.util.invalidateTags(['Orders', "Products", "Notification", "Users"]));
    };

    return { refreshAllData };
};