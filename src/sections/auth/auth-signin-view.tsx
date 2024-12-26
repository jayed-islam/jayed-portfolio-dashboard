/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { AuthFormValues, authValidationSchema } from "./auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/reducers/auth/authApi";
import toast from "react-hot-toast";
import { setToken } from "@/redux/reducers/auth/authSlice";
import { Alert } from "@mui/material";
import Link from "next/link";
import { paths } from "@/layouts/paths";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import FormProvider from "@/components/hook-form/form-provider";

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const methods = useForm<AuthFormValues>({
    resolver: zodResolver(authValidationSchema),
  });
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [loginUser, { isLoading }] = useLoginMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response.success) {
        dispatch(setToken(response?.data?.accessToken));
        toast.success(response.message);
        const returnTo = searchParams.get("returnTo");
        if (returnTo) {
          router.push(returnTo);
        } else if (response?.data?.user?.role === "vendor") {
          router.push(paths.vendor.root);
        } else if (response?.data?.user?.role === "customer") {
          router.push(paths.account.root);
        } else if (response?.data?.user?.role === "admin") {
          router.push(paths.admin.root);
        } else {
          router.push(paths.root);
        }
      } else {
        toast.error(response.message);
        setErrorMessage(response.message);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
      setErrorMessage(error.data.message);
    }
  });

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 11000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const renderForm = (
    <>
      <Stack
        spacing={3}
        sx={{
          mt: 5,
        }}
      >
        <RHFTextField label="Email" name="email" />
        <RHFTextField label="Password" type="password" name="password" />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link href={paths.forgetPassword} className="hover:underline">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        color="success"
      >
        Login
      </LoadingButton>

      <Typography variant="body2" sx={{ mt: 2 }} textAlign="center">
        Don’t have an account?
        <Link
          href={paths.signup}
          className="pl-2 text-green-600 hover:underline"
        >
          Register
        </Link>
      </Typography>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box
        sx={{
          bgcolor: "#F0F2F5",
        }}
      >
        <div className="h-screen pt-24">
          <Link href={paths.root}>
            <h2 className="text-4xl font-bold text-center mb-5">Bekreta</h2>
          </Link>
          <Stack alignItems="center" justifyContent="center">
            <Card
              sx={{
                p: 5,
                width: 1,
                maxWidth: 420,
                borderRadius: "2rem",
              }}
            >
              <Typography variant="h3" textAlign="center">
                Sign In
              </Typography>

              {errorMessage && (
                <Alert severity="error" sx={{ mt: 3 }}>
                  {errorMessage}
                </Alert>
              )}

              {renderForm}
            </Card>
          </Stack>
        </div>
      </Box>
    </FormProvider>
  );
}
