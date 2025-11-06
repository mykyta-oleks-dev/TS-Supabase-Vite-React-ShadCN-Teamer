import { ENV } from '@/constants/env.constants';
import axios from 'axios';
import supabase from './supabase';
import { handleError } from '@/lib/utils';

const axiosInstance = axios.create({
    baseURL: ENV.API.URL,
});

axiosInstance.interceptors.request.use(async (config) => {
    const { data, error } = await supabase.auth.getSession();

    if (error) handleError(error, true);

    if (data) {
        const idToken = data.session?.access_token;
        config.headers.Authorization = `Bearer ${idToken}`;
    }

    return config;
});

export default axiosInstance;
