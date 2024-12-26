/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/redux/api";
import { IBlog } from "@/types/blog";
import { IPagination } from "@/types/projects";

export type IBlogListFilterOptions = {
  searchTerm: string;
  page: number;
  limit: number;
};

interface IGetAllBlogResponse {
  success: boolean;
  message: string;
  data: {
    blogs: IBlog[];
    pagination: IPagination;
  };
}

interface IGetSingleBlog {
  success: boolean;
  message: string;
  data: IBlog;
}

export const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<IGetAllBlogResponse, IBlogListFilterOptions>({
      query: (body) => ({
        url: "/blogs/list",
        method: "POST",
        body,
      }),
      providesTags: ["Blogs"],
    }),
    getBlogById: builder.query<IGetSingleBlog, string>({
      query: (id) => `/blogs/${id}`,
    }),
    createBlog: builder.mutation<IGetSingleBlog, FormData>({
      query: (newBlog) => ({
        url: "/blogs",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation<
      IGetSingleBlog,
      { id: string; updates: Partial<IBlog> }
    >({
      query: ({ id, updates }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: updates,
      }),
    }),
    deleteBlog: builder.mutation<IGetSingleBlog, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
