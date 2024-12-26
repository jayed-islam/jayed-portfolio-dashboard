import { z } from "zod";

export const createBlogValidationSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must not exceed 100 characters" })
    .trim(),
  content: z.string().optional(),
  description: z.string({ required_error: "Description is required" }),
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const updateBlogValidationSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must not exceed 100 characters" })
    .optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});
