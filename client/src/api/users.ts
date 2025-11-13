import type { OneUser, ManyUsers } from '@/types/api';
import axiosInstance from '@/config/axios';
import { API } from '@/constants/api.constants';
import type { createProfileData } from '@/schemas/users.schemas';

export const getOneUser = (id: string) =>
    axiosInstance.get<OneUser>(API.USERS.ONE(id));

export const getManyUsers = () => axiosInstance.get<ManyUsers>(API.USERS.ROOT);

export const createUser = (values: createProfileData, avatar: string) =>
    axiosInstance.post<OneUser>(API.USERS.ROOT, { ...values, avatar });
