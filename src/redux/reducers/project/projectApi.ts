/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/redux/api";
import { IPagination, IProject } from "@/types/projects";

export type IProjectFilterOptions = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
  isLowestFirst?: boolean;
  isOldestFirst?: boolean;
};

export type IProjectListFilterOptions = {
  searchTerm: string;
  category: string;
  page: number;
  limit: number;
};

interface IGetAllProjectListResponse {
  success: boolean;
  message: string;
  data: {
    projects: IProject[];
    pagination: IPagination;
  };
}

interface IGetSingleProject {
  success: boolean;
  message: string;
  data: IProject;
}

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<
      IGetAllProjectListResponse,
      IProjectFilterOptions
    >({
      query: (options) => ({
        url: `/project/list`,
        method: "POST",
        body: options,
      }),
      providesTags: ["projects"],
    }),
    createProject: builder.mutation<IGetSingleProject, FormData>({
      query: (body) => ({
        url: `/project`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["projects"],
    }),
    updateProject: builder.mutation<
      IGetSingleProject,
      { id: string; data: Partial<IProject> }
    >({
      query: ({ id, data }) => ({
        url: `/project/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),
    softDeleteProject: builder.mutation<IGetSingleProject, { id: string }>({
      query: ({ id }) => ({
        url: `/project/delete/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["projects"],
    }),
    duplicateProject: builder.mutation<IGetSingleProject, { id: string }>({
      query: ({ id }) => ({
        url: `/project/duplicate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["projects"],
    }),
    getSingleProject: builder.query<IGetSingleProject, string>({
      query: (id) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useSoftDeleteProjectMutation,
  useDuplicateProjectMutation,
  useGetSingleProjectQuery,
  useGetAllProjectsQuery,
} = projectApi;
