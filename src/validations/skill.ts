import { z } from "zod";

export const createSkillValidationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name cannot be empty"),
  description: z.string().optional(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "Level is required",
  }),
  category: z.string().optional(),
});

export const updateSkillValidationSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  category: z.string().optional(),
  isDeleted: z.boolean().optional(),
});
