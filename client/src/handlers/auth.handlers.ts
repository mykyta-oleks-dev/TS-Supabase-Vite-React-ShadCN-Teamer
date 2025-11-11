import { logIn, changePassword, sendResetPassword, signUp } from '@/api/auth';
import getSupabase from '@/config/supabase';
import { ROUTES } from '@/constants/router.constants';
import { handleError } from '@/lib/utils';
import type {
    confirmPasswordData,
    logInData,
    signUpData,
} from '@/schemas/auth.schemas';
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

export const handleSendResetPassword = async (email: string) => {
    try {
        await sendResetPassword(email);

        toast.success(
            'A message was sent to the specified email with the reset password link!'
        );

        return true;
    } catch (error) {
        handleError(error, true);
    }
};

export const handleResetPassword = async (
    values: confirmPasswordData,
    navigate: NavigateFunction
) => {
    try {
        const res = await changePassword(values);

        const {access_token, refresh_token} = res.data;

        toast.success(
            'Your password was updated!'
        );

        const { error } = await getSupabase().auth.setSession({
            access_token, 
            refresh_token,
        });

        if (error) throw error;

        navigate(ROUTES.AUTH.LOG_IN);
    } catch (error) {
        handleError(error, true);
    }
};
