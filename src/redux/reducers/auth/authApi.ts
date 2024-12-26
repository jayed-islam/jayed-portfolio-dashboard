/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/redux/api";
import {
  IAuthLoginResponse,
  IChangePassowrdPayload,
  IGetMeResponse,
  IRegisterResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth";
import { setAuthLoading, setUser } from "./authSlice";
import { IUser } from "@/types/user";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthLoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user-me"],
    }),
    register: builder.mutation<IRegisterResponse, RegisterRequest>({
      query: (userDetails) => ({
        url: "/auth/register",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["user-me"],
    }),
    changePassword: builder.mutation<IRegisterResponse, IChangePassowrdPayload>(
      {
        query: (userDetails) => ({
          url: "/auth/change-password",
          method: "POST",
          body: userDetails,
        }),
        invalidatesTags: ["user-me"],
      }
    ),
    getMe: builder.query<IGetMeResponse, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user-me"],

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setAuthLoading(true));
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            const updatedData: IUser = Object.fromEntries(
              Object.entries(data.data).filter(
                ([key, value]) => value !== null && value !== undefined
              )
            ) as IUser;
            dispatch(setUser(updatedData));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    forgotPassword: builder.mutation<IAuthLoginResponse, { email: string }>({
      query: ({ email }) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["user-me"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useChangePasswordMutation,
  useForgotPasswordMutation,
} = authApi;
