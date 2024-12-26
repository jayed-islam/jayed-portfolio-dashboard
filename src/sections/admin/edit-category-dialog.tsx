/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Grid2,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";

import toast from "react-hot-toast";
import {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/reducers/category/categoryApi";
import { useRouter } from "next/navigation";
import FormProvider from "@/components/hook-form/form-provider";
import { Delete } from "@mui/icons-material";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import { LoadingButton } from "@mui/lab";
import RHFSelect from "@/components/hook-form/rhf-select-input";
import { useUpdateProductMutation } from "@/redux/reducers/product/projectApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/validations/product-schema";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/product";
import { BooleanState } from "@/types/utils";
import RHFCheckbox from "@/components/hook-form/rhf-checkbox";
import { ICategory } from "@/types/category";
import { updateCategorySchema } from "@/validations/review";

interface Props {
  initialValues: ICategory;
  dialog: BooleanState;
}

export const UpdateCategoryDialog = ({ initialValues, dialog }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const methods = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      ...initialValues,
      isDeleted: initialValues.isDeleted ?? false,
    },
  });

  const router = useRouter();

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  // console.log("isDeleted", watch("isDeleted"));

  const onSubmit = handleSubmit(async (data) => {
    const isDeleted = watch("isDeleted");
    console.log(data);

    const updatePayload: Partial<ICategory> = Object.keys(dirtyFields).reduce(
      (acc: Partial<ICategory>, field: string) => {
        if (field in data) {
          // Assert both the field and the value to ensure type correctness
          (acc as any)[field] = data[field as keyof ICategory];
        }
        return acc;
      },
      {} as Partial<ICategory>
    );

    const newData = {
      ...updatePayload,
      isDeleted,
    };

    try {
      const response = await updateCategory({
        id: initialValues._id,
        data: newData,
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
        dialog.setFalse();
      } else {
        toast.error(response.message);
        console.log(response);
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  });

  return (
    <Dialog open={dialog.value} onClose={dialog.setFalse}>
      <div className="p-5 lg:p-11">
        <Typography
          sx={{
            mb: 2,
          }}
          variant="subtitle2"
        >
          Update category form
        </Typography>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="flex flex-col gap-5">
            <RHFTextField name="name" label="Category name" />
            <RHFTextField name="slug" label="SLug" />

            <RHFCheckbox name="isDeleted" label="Mark as deleted" />

            <div className="flex items-center justify-end gap-3">
              <Button variant="outlined" onClick={dialog.setFalse}>
                Close
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                color="primary"
                loading={isLoading}
                disabled={isLoading}
              >
                Update Category
              </LoadingButton>
            </div>
          </div>
        </FormProvider>
      </div>
    </Dialog>
  );
};
