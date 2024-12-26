/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/redux/api";
import { ISkill } from "@/types/skill";
import { IPagination } from "@/types/projects";

export type ISkillListFilterOptions = {
  searchTerm: string;
  page: number;
  limit: number;
};

interface IGetAllSkillsResponse {
  success: boolean;
  message: string;
  data: {
    skills: ISkill[];
    pagination: IPagination;
  };
}

interface IGetSingleSkill {
  success: boolean;
  message: string;
  data: ISkill;
}

export const skillApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<IGetAllSkillsResponse, ISkillListFilterOptions>({
      query: (body) => ({
        url: "/skills/list",
        method: "POST",
        body,
      }),
      providesTags: ["Skills"],
    }),
    getSkillById: builder.query<IGetSingleSkill, string>({
      query: (id) => `/skills/${id}`,
    }),
    createSkill: builder.mutation<IGetSingleSkill, FormData>({
      query: (newSkill) => ({
        url: "/skills",
        method: "POST",
        body: newSkill,
      }),
      invalidatesTags: ["Skills"],
    }),
    updateSkill: builder.mutation<
      IGetSingleSkill,
      { id: string; updates: Partial<ISkill> }
    >({
      query: ({ id, updates }) => ({
        url: `/skills/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Skills"],
    }),
    deleteSkill: builder.mutation<IGetSingleSkill, string>({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useGetSkillByIdQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;
