/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/redux/api";
import { IPagination } from "@/types/product";
import { IGetUpdateUSERProfileResponse, IUser } from "@/types/user";

interface IGetUsersForAdminResponse {
  success: boolean;
  message: string;
  data: {
    users: IUser[];
    pagination: IPagination;
  };
}

export const vendorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation<
      IGetUpdateUSERProfileResponse,
      Partial<IUser>
    >({
      query: ({ _id, ...data }) => ({
        url: `/user/me/update/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user-me"],
    }),
    updateUserProfilePicture: builder.mutation<
      IGetUpdateUSERProfileResponse,
      { body: FormData; id: string }
    >({
      query: ({ id, body }) => ({
        url: `/user/me/update/profile-picture/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user-me"],
    }),
    getUsersForAdmin: builder.query<
      IGetUsersForAdminResponse,
      { role?: string; search?: string; limit?: number; page?: number }
    >({
      query: ({ role, search, limit = 10, page = 1 }) => ({
        url: `/user/get-list`,
        method: "POST",
        body: { role, search, limit, page },
      }),
      providesTags: ["admin-users"],
    }),
    updateUserStatus: builder.mutation<
      IGetUsersForAdminResponse,
      { userId: string; status?: string; isBlacklisted?: boolean }
    >({
      query: (body) => ({
        url: `/user/update-status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["admin-users"],
    }),
  }),
});

export const {
  useUpdateUserProfilePictureMutation,
  useUpdateUserProfileMutation,
  useGetUsersForAdminQuery,
  useUpdateUserStatusMutation,
} = vendorApi;
