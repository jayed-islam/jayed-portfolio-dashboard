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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/hooks";
import { useChangePasswordMutation } from "@/redux/reducers/auth/authApi";
import toast from "react-hot-toast";
import { Alert } from "@mui/material";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import FormProvider from "@/components/hook-form/form-provider";
import { changePasswordValidationSchema } from "@/validations/auth";

// ----------------------------------------------------------------------

export default function ChangePasswordView() {
  const theme = useTheme();

  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(changePasswordValidationSchema),
  });
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await changePassword({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
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
        <RHFTextField label="Old Password" type="password" name="oldPassword" />
        <RHFTextField label="New Password" type="password" name="newPassword" />
        <RHFTextField
          label="Confirm New Password"
          type="password"
          name="confirmNewPassword"
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        color="success"
        sx={{ mt: 3 }}
      >
        Change Password
      </LoadingButton>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box>
        <div className="px-5 xl:px-0">
          <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
            <Card
              sx={{
                p: 5,
                width: 1,
                maxWidth: 420,
                borderRadius: "2rem",
              }}
            >
              <Typography variant="h3" textAlign="center">
                Change Password
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
