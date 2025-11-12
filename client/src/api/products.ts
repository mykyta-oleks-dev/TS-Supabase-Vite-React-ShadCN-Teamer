import axiosInstance from "@/config/axios";
import { API } from "@/constants/api.constants";
import { type ManyProducts } from "@/types/api";

export const getManyProducts = () =>
	axiosInstance.get<ManyProducts>(API.PRODUCTS.ROOT);
