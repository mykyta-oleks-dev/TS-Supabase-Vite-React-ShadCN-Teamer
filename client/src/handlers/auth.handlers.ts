import { logIn, signUp } from '@/api/auth';
import getSupabase from '@/config/supabase';
import { ROUTES } from '@/constants/router.constants';
import { handleError } from '@/lib/utils';
import type { logInData, signUpData } from '@/schemas/auth.schemas';
import type { NavigateFunction } from 'react-router';
import { toast } from 'sonner';

export const handleLogin = async (
    values: logInData,
    navigate?: NavigateFunction
) => {
    try {
        const { data } = await logIn(values);

        const { error } = await getSupabase().auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
        });

        if (error) throw error;
    } catch (error) {
        handleError(error as Error, true);
        return;
    }

    navigate?.(ROUTES.ROOT);
};

export const handleSignup = async (
    values: signUpData,
    navigate?: NavigateFunction
) => {
    try {
        const { data } = await signUp(values);

        toast.success(data.message);
    } catch (error) {
        handleError(error as Error, true);
        return;
    }

    navigate?.(ROUTES.AUTH.LOG_IN);
};

export const handleLogout = async () => {
    const { error } = await getSupabase().auth.signOut();

    if (error) {
        handleError(error, true);
    }
};
