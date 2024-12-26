import { z } from "zod";

export const createProjectValidationSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title must be at least 1 character long" })
    .trim(),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must be at least 1 character long" })
    .trim(),
  technologies: z
    .array(z.string())
    .min(1, { message: "At least one technology must be provided" })
    .nonempty({ message: "Technologies array cannot be empty" }),
  liveUrl: z.string().url().optional(),
  frontendRepoUrl: z.string().url().optional(),
  backendRepoUrl: z.string().url().optional(),
  image: z.string().url({ message: "Image must be a valid URL" }).optional(),
  category: z.string().optional(),
  isFeatured: z.boolean().optional(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "CANCELLED"], {
    required_error: "Status is required",
  }),
  startDate: z.date({ required_error: "Start Date is required" }),
  endDate: z.date().optional(),
});
export const updateProjectValidationSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 character long" })
    .optional(),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" })
    .optional(),
  technologies: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional(),
  frontendRepoUrl: z.string().url().optional(),
  backendRepoUrl: z.string().url().optional(),
  image: z.string().url().optional(),
  category: z.string().optional(),
  isFeatured: z.boolean().optional(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  updatedBy: z.string().optional(),
  isDeleted: z.boolean().optional(),
});
