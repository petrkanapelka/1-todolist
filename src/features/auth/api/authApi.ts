import { instance } from "common/instance";
import { ApiResponse } from "common/types/types";
import { LoginArgs } from "./authApi.types";

export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<ApiResponse<{ userId: number; token: string }>>(`auth/login`, payload);
  },
  logout() {
    return instance.delete<ApiResponse>('auth/login')
  },
  me() {
    return instance.get<ApiResponse<{ id: number; email: string; login: string }>>('auth/me')
  },
};
