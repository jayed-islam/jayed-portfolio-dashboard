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
import { useGetCategoriesQuery } from "@/redux/reducers/category/categoryApi";
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

interface Props {
  initialValues: IProduct;
  dialog: BooleanState;
}

export const UpdateProductView = ({ initialValues, dialog }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const methods = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...initialValues,
      category: initialValues?.category?._id,
      isDeleted: initialValues?.isDeleted ?? false,
    },
  });

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoriesQuery();

  const router = useRouter();

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  const {
    fields: qualitiesFields,
    append: appendQuaity,
    remove: removeQuality,
  } = useFieldArray({
    control,
    name: "qualities" as never,
  });

  // console.log("isDeleted", watch("isDeleted"));

  const onSubmit = handleSubmit(async (data) => {
    const isDeleted = watch("isDeleted");
    console.log(data);

    const updatePayload: Partial<IProduct> = Object.keys(dirtyFields).reduce(
      (acc: Partial<IProduct>, field: string) => {
        if (field in data) {
          // Assert both the field and the value to ensure type correctness
          (acc as any)[field] = data[field as keyof IProduct];
        }
        return acc;
      },
      {} as Partial<IProduct>
    );

    const newData = {
      vendor:
        typeof initialValues?.vendor === "object"
          ? initialValues.vendor._id
          : initialValues?.vendor,
      ...updatePayload,
      isDeleted,
    };

    try {
      const response = await updateProduct({
        id: initialValues._id,
        data: newData,
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
        reset();
      } else {
        toast.error(response.message);
        console.log(response);
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  });

  useEffect(() => {
    if (qualitiesFields.length === 0) {
      appendQuaity("");
    }
  }, []);

  return (
    <Dialog open={dialog.value} onClose={dialog.setFalse}>
      <div className="p-5 lg:p-11">
        <Typography
          sx={{
            mb: 2,
          }}
          variant="subtitle2"
        >
          Update product form
        </Typography>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="flex flex-col gap-5">
            <RHFTextField name="name" label="Product Name" />
            <RHFTextField name="description" label="Description" />
            <RHFSelect
              name="category"
              label="Category"
              options={
                categoryData?.data?.map((category) => ({
                  label: category.name,
                  value: category._id,
                })) || []
              }
            />
            <div className="flex items-center gap-5">
              <RHFTextField
                name="inventoryCount"
                label="Inventory Count"
                type="number"
              />
              <RHFTextField name="price" label="Price" type="number" />
            </div>

            {user && user.role === "admin" && (
              <Box>
                <Typography
                  sx={{
                    mb: 1,
                  }}
                  variant="subtitle2"
                >
                  Product Action
                </Typography>
                <div className="flex flex-col gap-3">
                  <RHFCheckbox name="isDeleted" label="Mark as deleted" />
                  <RHFCheckbox name="isOnSale" label="Mark as Flash Sale" />
                </div>
              </Box>
            )}

            <Box>
              <Typography
                sx={{
                  mb: 1,
                }}
                variant="subtitle2"
              >
                Qualities
              </Typography>
              {qualitiesFields.map((field, index) => (
                <Box key={field.id} display="flex" alignItems="center" mb={1}>
                  <RHFTextField
                    name={`qualities.${index}`}
                    placeholder="Write qualitiy here..."
                  />
                  <IconButton
                    onClick={() => removeQuality(index)}
                    disabled={qualitiesFields.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              <Button variant="outlined" onClick={() => appendQuaity("")}>
                Add Quality
              </Button>
            </Box>

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
                Update Product
              </LoadingButton>
            </div>
          </div>
        </FormProvider>
      </div>
    </Dialog>
  );
};
