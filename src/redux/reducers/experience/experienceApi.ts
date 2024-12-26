/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/redux/api";
import { IExperience } from "@/types/esp";
import { IPagination } from "@/types/projects";

export type IExperienceListFilterOptions = {
  searchTerm: string;
  page: number;
  limit: number;
};

interface IGetAllExperiencesResponse {
  success: boolean;
  message: string;
  data: {
    experiences: IExperience[];
    pagination: IPagination;
  };
}

interface IGetSingleExperienceResponse {
  success: boolean;
  message: string;
  data: IExperience;
}

export const experienceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExperiences: builder.query<
      IGetAllExperiencesResponse,
      IExperienceListFilterOptions
    >({
      query: (body) => ({
        url: "/experiences/list",
        method: "POST",
        body,
      }),
      providesTags: ["Experiences"],
    }),
    getExperienceById: builder.query<IGetSingleExperienceResponse, string>({
      query: (id) => `/experiences/${id}`,
    }),
    createExperience: builder.mutation<
      IGetSingleExperienceResponse,
      Partial<IExperience>
    >({
      query: (newExperience) => ({
        url: "/experiences",
        method: "POST",
        body: newExperience,
      }),
      invalidatesTags: ["Experiences"],
    }),
    updateExperience: builder.mutation<
      IGetSingleExperienceResponse,
      { id: string; updates: Partial<IExperience> }
    >({
      query: ({ id, updates }) => ({
        url: `/experiences/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Experiences"],
    }),
    deleteExperience: builder.mutation<IGetSingleExperienceResponse, string>({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experiences"],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useGetExperienceByIdQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
