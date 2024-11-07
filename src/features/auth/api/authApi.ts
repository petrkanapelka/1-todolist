import { ApiResponse } from "common/types/types";
import { LoginArgs } from "./authApi.types";
import { baseApi } from "app/baseApi";
import { instance } from "common/instance";

export const _authApi = {
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

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<ApiResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "auth/me",
    }),
    login: build.mutation<ApiResponse<{ userId: number; token: string }>, LoginArgs>({
      query: (payload) => {
        return {
          method: "POST",
          url: "auth/login",
          body: payload,
        };
      },
    }),
    logout: build.mutation<ApiResponse, void>({
      query: () => {
        return {
          method: "DELETE",
          url: "auth/login",
        };
      },
    }),
  }),
});

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi;
