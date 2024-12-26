import { z } from "zod";

export const changePasswordValidationSchema = z
  .object({
    oldPassword: z.string({
      required_error: "Old password is required",
    }),
    newPassword: z.string({ required_error: "Password is required" }),
    confirmNewPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmNewPassword"],
        message: "Passwords must match",
      });
    }
  });
