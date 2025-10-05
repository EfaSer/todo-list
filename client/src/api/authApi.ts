import { IAuthResponse, IUser } from "@/types/auth";
import { axiosInstance } from "./axiosInstance";

export const authApi = {
  async register(data: IUser) {
    const res = await axiosInstance.post<IAuthResponse>("/auth/register", data);
    return res.data;
  },

  async login(data: IUser) {
    const res = await axiosInstance.post<IAuthResponse>("/auth/login", data);
    return res.data;
  },
};
