import axiosInstance from '@/config/axios';
import { API } from '@/constants/api.constants';
import type { logInData, signUpData } from '@/schemas/user.schemas';
import type { DefaultBody, AuthToken, OneUser } from '@/types/api';

export const logIn = (values: logInData) =>
    axiosInstance.post<AuthToken>(API.USERS.LOG_IN, values, {
		params: { redirectTo: globalThis.location.origin }
	});

export const signUp = (values: signUpData) =>
    axiosInstance.post<DefaultBody>(API.USERS.SIGN_UP, values);

export const getOneUser = (id: string) =>
    axiosInstance.get<OneUser>(API.USERS.ONE(id));
