/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";

import RHFTextField from "@/components/hook-form/rhf-text-field";
import FormProvider from "@/components/hook-form/form-provider";
import RHFCheckbox from "@/components/hook-form/rhf-checkbox";
import { IProject } from "@/types/projects";
import { commonTechnologies, statusOptions } from "@/constants";
import RHFSelect from "@/components/hook-form/rhf-select-input";
import { createProjectValidationSchema } from "@/validations/projects";
import { BooleanState } from "@/types/utils";
import RHFDatePicker from "@/components/hook-form/rhf-date-picker";
import { IBlog } from "@/types/blog";
import { useUpdateBlogMutation } from "@/redux/reducers/blog/blogApi";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StyledAutocompletePaper = styled("div")(({ theme }) => ({
  border: "1px solid #ccc",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  backgroundColor: "white",
}));

interface Props {
  initialValues: IBlog;
  dialog: BooleanState;
}

export const BlogEditDialog = ({ initialValues, dialog }: Props) => {
  const [value, setValue] = useState(initialValues.content ?? "");
  const [images, setImages] = useState<File[]>([]);
  const methods = useForm({
    resolver: zodResolver(createProjectValidationSchema),
    defaultValues: {
      ...initialValues,
      isPublished: initialValues?.isPublished ?? false,
    },
  });

  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { dirtyFields },
  } = methods;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Select only the first file
    const maxSize = 2 * 1024 * 1024;

    if (file) {
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds the 2 MB size limit.`);
      } else {
        setImages([file]); // Replace the current images with the new single image
      }
    }
  };

  // Remove the selected image
  const handleRemoveImage = () => {
    setImages([]); // Clear the images array
  };

  const onSubmit = handleSubmit(async (data) => {
    const updatePayload: Partial<IBlog> = Object.keys(dirtyFields).reduce(
      (acc: Partial<IBlog>, field: string) => {
        if (field in data) {
          (acc as any)[field] = data[field as keyof IBlog];
        }
        return acc;
      },
      {} as Partial<IBlog>
    );

    try {
      const response = await updateBlog({
        id: initialValues._id,
        updates: updatePayload,
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
        reset();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error("Failed to update project");
    }
  });

  return (
    <Dialog open={dialog.value} onClose={dialog.setFalse}>
      <div className="p-5 lg:p-11">
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Update Blog
        </Typography>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="flex flex-col gap-5">
            <RHFTextField name="title" label="Project Title" />
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={4}
            />

            <RHFCheckbox name="isPublished" label="Is Published?" />
            <RHFCheckbox name="isDeleted" label="Is Deleted?" />

            <Controller
              name="tags"
              control={control}
              render={({ field, formState: { errors } }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  options={commonTechnologies.map((option) => option.label)}
                  value={field.value}
                  onChange={(e, newValue) => field.onChange(newValue)}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant="outlined"
                          label={option}
                          key={key}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Add tags"
                      error={Boolean(errors.tags)}
                    />
                  )}
                  PaperComponent={({ children }) => (
                    <StyledAutocompletePaper>
                      {children}
                    </StyledAutocompletePaper>
                  )}
                />
              )}
            />

            <div className="h-48 lg:h-64 overflow-auto">
              <ReactQuill
                value={value}
                onChange={setValue}
                placeholder="What's on your mind?"
                className="react-quill h-52"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="outlined" onClick={dialog.setFalse}>
                Close
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                color="primary"
                loading={isLoading}
              >
                Update Blog
              </LoadingButton>
            </div>
          </div>
        </FormProvider>
      </div>
    </Dialog>
  );
};
