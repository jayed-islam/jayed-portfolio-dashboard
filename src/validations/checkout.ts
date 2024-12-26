import { z } from "zod";

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(50, { message: "Full name cannot exceed 50 characters" }),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, { message: "Phone number must be 10-15 digits" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" }),
  paymentMethod: z.enum(["cashOnDelivery", "aamarpay"], {
    required_error: "Payment method is required",
  }),
  couponCode: z
    .string()
    .regex(/^[A-Za-z0-9]*$/, { message: "Coupon code must be alphanumeric" })
    .optional(),
});

export const orderCreateValidationSchema = z.object({
  phone: z
    .string()
    .regex(/^\d{10,15}$/, { message: "Phone number must be 10-15 digits" }),
  name: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(50, { message: "Full name cannot exceed 50 characters" }),
  paymentMethod: z.enum(["cashOnDelivery", "aamarpay"], {
    required_error: "Payment method is required",
  }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" }),
});
