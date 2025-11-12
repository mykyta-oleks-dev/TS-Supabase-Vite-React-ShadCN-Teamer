import axiosInstance from "@/config/axios";
import { API } from "@/constants/api.constants";
import { type GetProductQueryParams, type ManyProducts } from "@/types/api";

export const getManyProducts = (params?: GetProductQueryParams) =>
	axiosInstance.get<ManyProducts>(API.PRODUCTS.ROOT, { params });
