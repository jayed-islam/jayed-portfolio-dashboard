import { ReviewType } from "@/types/review";
import { z } from "zod";

export const reviewSchema = z
  .object({
    content: z.string().optional(),
    type: z.nativeEnum(ReviewType).default(ReviewType.TEXT),
    image: z
      .array(z.string().url({ message: "Must be a valid URL" }))
      .optional(),
  })
  .refine(
    (data) => {
      // Check if the comment type is TEXT and content is provided
      if (data.type === ReviewType.TEXT && !data.content) {
        return false; // Invalid if content is required but not provided
      }
      return true; // Valid otherwise
    },
    {
      message: "Content is required for text comments.",
      path: ["content"], // This will show the error message on the content field
    }
  );

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(100, { message: "Category name must be less than 100 characters" }),
  slug: z.string({ required_error: "Slug is required" }).nonempty(),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(100, { message: "Category name must be less than 100 characters" })
    .optional(),
  slug: z.string().nonempty().optional(),
});
