import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character long" })
    .trim(),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must be at least 1 character long" })
    .trim(),
  price: z
    .number({ required_error: "Price is required" })
    .min(0, { message: "Price must be 0 or greater" }),
  inventoryCount: z
    .number({ required_error: "Inventory count is required" })
    .min(0, { message: "Inventory count must be 0 or greater" }),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, { message: "Category must not be empty" })
    .trim(),
  qualities: z
    .array(z.string({ required_error: "Qualiey is required" }).nonempty())
    .min(1, "At least one quality is required and cannot be empty."),

  images: z.array(z.string().trim()).optional(),
  isOnSale: z.boolean().optional(),
  isPublished: z.boolean().optional(),
});
