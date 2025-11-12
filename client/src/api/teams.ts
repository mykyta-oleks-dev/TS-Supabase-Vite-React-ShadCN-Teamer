import axiosInstance from '@/config/axios';
import { API } from '@/constants/api.constants';
import type { teamCreateData } from '@/schemas/teams.schemas';
import type { OneTeam } from '@/types/api';

export const joinTeam = (code: string) =>
    axiosInstance.post(API.TEAMS.JOIN, { code });

export const createTeam = (values: teamCreateData) =>
    axiosInstance.post<OneTeam>(API.TEAMS.ROOT, values);

export const getOwnTeam = (deep?: boolean) =>
    axiosInstance.get<OneTeam>(API.TEAMS.ROOT, {
        params: { deep }
    });
