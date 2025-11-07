import { logIn } from '@/api/users';
import router from '@/config/router';
import getSupabase from '@/config/supabase';
import { ROUTES } from '@/constants/router.constants';
import { handleError } from '@/lib/utils';
import type { logInData } from '@/schemas/user.schemas';
import type { NavigateFunction } from 'react-router';

export const handleLogin = async (
    values: logInData,
    navigate?: NavigateFunction
) => {
    try {
        const {
            data,
        } = await logIn(values);

        const { error } = await getSupabase().auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
        });

        if (error) throw error;
    } catch (error) {
        handleError(error as Error, true);
        return;
    }

    if (navigate) {
        navigate(ROUTES.ROOT);
    } else {
        router.navigate(ROUTES.ROOT);
    }
};

export const handleLogout = async () => {
    const { error } = await getSupabase().auth.signOut();

    if (error) {
        handleError(error, true);
    }
};
