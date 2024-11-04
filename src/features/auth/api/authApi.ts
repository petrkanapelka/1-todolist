import { instance } from "common/instance";
import { BaseResponse } from "common/types/types";
import { LoginArgs } from "./authApi.types";

export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload);
  },
};
