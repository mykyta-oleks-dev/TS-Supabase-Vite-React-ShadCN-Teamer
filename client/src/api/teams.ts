import axiosInstance from "@/config/axios";
import { API } from "@/constants/api.constants";

export const joinTeam = (code: string) => 
	axiosInstance.post(API.TEAMS.JOIN, { code });
