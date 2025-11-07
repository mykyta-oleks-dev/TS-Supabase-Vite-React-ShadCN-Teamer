import axiosInstance from "@/config/axios";
import { API } from "@/constants/api.constants";
import type { OneUser } from "@/types/api";

export const getOneUser = (id: string) => 
	axiosInstance.get<OneUser>(API.USERS.ONE(id));
