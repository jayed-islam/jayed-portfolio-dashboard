/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
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
import {
  createProjectValidationSchema,
  updateProjectValidationSchema,
} from "@/validations/projects";
import { BooleanState } from "@/types/utils";
import RHFDatePicker from "@/components/hook-form/rhf-date-picker";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/redux/reducers/project/projectApi";
import { useState } from "react";
import { Delete, ImageAspectRatio } from "@mui/icons-material";
import Image from "next/image";

const StyledAutocompletePaper = styled("div")(({ theme }) => ({
  border: "1px solid #ccc",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  backgroundColor: "white",
}));

interface Props {
  dialog: BooleanState;
}

export const CreateProjectDialog = ({ dialog }: Props) => {
  const [images, setImages] = useState<File[]>([]);
  const methods = useForm({
    resolver: zodResolver(createProjectValidationSchema),
  });

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { dirtyFields },
  } = methods;

  const {
    fields: infos,
    append: appendInfo,
    remove: removeInfo,
  } = useFieldArray({
    control,
    name: "infos",
  });

  // Remove the selected image
  const handleRemoveImage = () => {
    setImages([]);
  };

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

  const onSubmit = handleSubmit(async (data) => {
    if (images.length === 0) {
      toast.error("Please add minimum 1 image");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", images[0]);

    try {
      const response = await createProject(formData).unwrap();
      if (response.success) {
        toast.success(response.message);
        setImages([]);
        dialog.setFalse();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error("Failed to create project");
    }
  });

  return (
    <Dialog open={dialog.value} onClose={dialog.setFalse}>
      <div className="p-5 lg:p-11">
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Create Project
        </Typography>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="image" className="w-full">
                <div className="flex items-center justify-between border-2 border-gray-200 px-5 py-3 rounded-md cursor-pointer">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <h2 className="text-md font-semibold">Add Image</h2>
                  <ImageAspectRatio />
                </div>
              </label>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Selected image ${index + 1}`}
                    className="h-16 w-full object-cover rounded-md"
                    width={200}
                    height={200}
                  />
                  <button
                    onClick={() => handleRemoveImage()}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <RHFTextField name="title" label="Project Title" />
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={4}
            />
            <RHFTextField name="liveUrl" label="Live URL" />
            <RHFTextField
              name="frontendRepoUrl"
              label="Frontend Repository URL"
            />
            <RHFTextField
              name="backendRepoUrl"
              label="Backend Repository URL"
            />

            <RHFCheckbox name="isPublished" label="Published" />

            <div className="flex items-center gap-3">
              <RHFDatePicker name="startDate" label="Start Date" />
              <RHFDatePicker name="endDate" label="End Date" />
            </div>

            <RHFSelect
              name="status"
              label="Project Status"
              options={statusOptions}
            />

            <Controller
              name="technologies"
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
                      label="Technologies"
                      placeholder="Add technologies"
                      error={Boolean(errors.technologies)}
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

            <Box>
              <Typography
                sx={{
                  mb: 1,
                }}
                variant="subtitle2"
              >
                Infos
              </Typography>
              {infos.map((field, index) => (
                <Box key={field.id} display="flex" alignItems="center" mb={1}>
                  <RHFTextField
                    name={`infos.${index}`}
                    placeholder="Write info here..."
                  />
                  <IconButton
                    onClick={() => removeInfo(index)}
                    disabled={infos.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              <Button variant="outlined" onClick={() => appendInfo("")}>
                Add Info
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
              >
                Create Project
              </LoadingButton>
            </div>
          </div>
        </FormProvider>
      </div>
    </Dialog>
  );
};
