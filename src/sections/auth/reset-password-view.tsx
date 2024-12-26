/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Card,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import FormProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import Link from "next/link";
import { paths } from "@/layouts/paths";

const resetPasswordSchema = z
  .object({
    newPassword: z.string({ required_error: "New password is required" }),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Use useEffect to retrieve URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
    setToken(params.get("token"));
  }, []);

  const methods = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // Assert the type of data
    const { newPassword, confirmPassword } = data as {
      newPassword: string;
      confirmPassword: string;
    };

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/auth/reset-password`,
        { id, newPassword },
        { headers: { Authorization: token } }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        reset();
        window.location.href = "/auth/signin";
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="bg-gray-100">
        <div className="max-w-5xl mx-auto flex-col px-5 xl:px-0 h-screen flex items-center justify-center">
          <Link href={paths.root}>
            <h2 className="text-4xl font-bold text-center mb-5">Bekreta</h2>
          </Link>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
              borderRadius: "2rem",
            }}
          >
            <Typography variant="h5" align="center">
              Reset Password
            </Typography>

            <div className="flex items-center flex-col gap-3 mt-5 mb-5">
              <RHFTextField
                type="password"
                name="newPassword"
                label="New Password"
              />

              <RHFTextField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
              />
            </div>

            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              sx={{ textTransform: "capitalize" }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Reset Password"}
            </LoadingButton>
          </Card>
        </div>
      </div>
    </FormProvider>
  );
};

export default ResetPassword;
