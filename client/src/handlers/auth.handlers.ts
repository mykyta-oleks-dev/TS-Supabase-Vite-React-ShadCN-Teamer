import { logIn, changePassword, sendResetPassword, signUp } from '@/api/auth';
import getSupabase from '@/config/supabase';
import { ROUTES } from '@/constants/router.constants';
import { getUrlToPath, handleError } from '@/lib/utils';
import type {
    confirmPasswordData,
    logInData,
    signUpData,
} from '@/schemas/auth.schemas';
import type { NavigateFunction } from 'react-router';
import { toast } from 'sonner';

export const handleLogin = async (values: logInData) => {
    try {
        const { data } = await logIn(values);

        const { error } = await getSupabase().auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
        });

        if (error) throw error;
    } catch (error) {
        handleError(error, true);
        return;
    }
};

export const handleSignup = async (
    values: signUpData,
    navigate?: NavigateFunction
) => {
    try {
        const { data } = await signUp(values);

        toast.success(data.message);
    } catch (error) {
        handleError(error, true);
        return;
    }

    navigate?.(ROUTES.AUTH.LOG_IN);
};

export const handleGoogleAuth = async () => {
    try {
        const supabase = getSupabase();

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',

            options: {
                redirectTo: getUrlToPath(ROUTES.AUTH.LOG_IN),
            },
        });
        if (error) throw error;
    } catch (error) {
        handleError(error, true);
    }
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

        const { access_token, refresh_token } = res.data;

        toast.success('Your password was updated!');

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
