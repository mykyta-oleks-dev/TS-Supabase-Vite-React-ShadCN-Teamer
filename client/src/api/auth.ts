import axiosInstance from '@/config/axios';
import { API } from '@/constants/api.constants';
import { ROUTES } from '@/constants/router.constants';
import { getUrlToPath } from '@/lib/utils';
import type { logInData, signUpData } from '@/schemas/auth.schemas';
import type { DefaultBody, AuthToken } from '@/types/api';

export const logIn = (values: logInData) =>
    axiosInstance.post<AuthToken>(API.USERS.LOG_IN, values);

export const signUp = (values: signUpData) =>
    axiosInstance.post<DefaultBody>(API.USERS.SIGN_UP, values, {
        params: { redirectTo: getUrlToPath(ROUTES.AUTH.LOG_IN) },
    });
