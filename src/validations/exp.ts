import { z } from "zod";

export const createExperienceValidationSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title must be at least 1 character long" })
    .trim(),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must be at least 1 character long" })
    .trim(),
  company: z
    .string({ required_error: "Company name is required" })
    .min(1, { message: "Company name must not be empty" })
    .trim(),
  companyWebsite: z
    .string({ required_error: "Company website is required" })
    .min(1, { message: "Company website must not be empty" })
    .trim(),
  companyLogo: z
    .string({ required_error: "companyLogo is required" })
    .min(1, { message: "companyLogo must not be empty" })
    .trim(),
  startDate: z.date({ required_error: "Start Date is required" }),
  endDate: z.date().optional(),
  location: z
    .string({ required_error: "Location is required" })
    .min(1, { message: "Location must not be empty" })
    .trim(),

  isCurrentWorking: z.boolean().optional(),
});

export const updateExperienceValidationSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 character long" })
    .optional(),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" })
    .optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  updatedBy: z.string().optional(),
  isDeleted: z.boolean().optional(),
  companyLogo: z
    .string({ required_error: "companyLogo is required" })
    .min(1, { message: "companyLogo must not be empty" })
    .trim(),
  isCurrentWorking: z.boolean().optional(),
});
