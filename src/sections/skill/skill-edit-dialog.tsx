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
import { commonTechnologies, levelOptions, statusOptions } from "@/constants";
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
import { ImageAspectRatio } from "@mui/icons-material";
import Image from "next/image";
import {
  createSkillValidationSchema,
  updateSkillValidationSchema,
} from "@/validations/skill";
import { ISkill } from "@/types/skill";
import { useUpdateSkillMutation } from "@/redux/reducers/skill/skillApi";

interface Props {
  dialog: BooleanState;
  intValues: ISkill;
}

export const EditSkillDialog = ({ dialog, intValues }: Props) => {
  const [images, setImages] = useState<File[]>([]);
  const methods = useForm({
    resolver: zodResolver(updateSkillValidationSchema),
    defaultValues: intValues,
  });

  const [updateSkill, { isLoading }] = useUpdateSkillMutation();

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { dirtyFields },
  } = methods;

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
    const updatePayload: Partial<ISkill> = Object.keys(dirtyFields).reduce(
      (acc: Partial<ISkill>, field: string) => {
        if (field in data) {
          (acc as any)[field] = data[field as keyof ISkill];
        }
        return acc;
      },
      {} as Partial<ISkill>
    );
    try {
      const response = await updateSkill({
        id: intValues._id,
        updates: updatePayload,
      }).unwrap();
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
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      maxWidth="sm"
      fullWidth
    >
      <div className="p-5 lg:p-11">
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Create Skill
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

            <RHFTextField name="name" label="Name" />
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={3}
            />

            <RHFSelect
              name="Label"
              label="Skill label"
              options={levelOptions}
            />

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
                Update Skill
              </LoadingButton>
            </div>
          </div>
        </FormProvider>
      </div>
    </Dialog>
  );
};
