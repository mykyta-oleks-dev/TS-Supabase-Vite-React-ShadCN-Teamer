import axiosInstance from "@/config/axios";
import { API } from "@/constants/api.constants";
import type { DefaultBody } from "@/types/api.types";

export const helloWorld = () => axiosInstance.get<DefaultBody>(API.ROOT);
