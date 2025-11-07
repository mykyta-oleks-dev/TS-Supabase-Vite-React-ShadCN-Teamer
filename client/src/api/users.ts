import axiosInstance from '@/config/axios';
import { API } from '@/constants/api.constants';
import type { logInData } from '@/schemas/user.schemas';
import type { AuthToken, OneUser } from '@/types/api';

export const logIn = (values: logInData) =>
    axiosInstance.post<AuthToken>(API.USERS.LOG_IN, values);

export const getOneUser = (id: string) =>
    axiosInstance.get<OneUser>(API.USERS.ONE(id));
