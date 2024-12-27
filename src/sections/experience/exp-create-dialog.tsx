/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";

import RHFTextField from "@/components/hook-form/rhf-text-field";
import FormProvider from "@/components/hook-form/form-provider";
import { BooleanState } from "@/types/utils";
import RHFDatePicker from "@/components/hook-form/rhf-date-picker";
import { createExperienceValidationSchema } from "@/validations/exp";
import { useCreateExperienceMutation } from "@/redux/reducers/experience/experienceApi";
import RHFCheckbox from "@/components/hook-form/rhf-checkbox";
import { Delete } from "@mui/icons-material";

interface Props {
  dialog: BooleanState;
}

export const CreateExpDialog = ({ dialog }: Props) => {
  const methods = useForm({
    resolver: zodResolver(createExperienceValidationSchema),
  });

  const [createExperience, { isLoading }] = useCreateExperienceMutation();

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { dirtyFields, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createExperience(data).unwrap();
      if (response.success) {
        toast.success(response.message);
        dialog.setFalse();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error("Failed to create project");
    }
  });

  console.log("err", errors);

  const {
    fields: activities,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: "activities",
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
          Create Experience
        </Typography>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="flex flex-col gap-5">
            <RHFTextField name="title" label="Title" />
            <RHFTextField name="company" label="Company name" />
            <RHFTextField name="companyWebsite" label="Company Website Link" />
            <RHFTextField name="companyLogo" label="Company Logo Link" />
            <RHFTextField name="location" label="Location" />
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={3}
            />

            <div className="flex items-center gap-3">
              <RHFDatePicker name="startDate" label="Start Date" />
              <RHFDatePicker name="endDate" label="End Date" />
            </div>

            <RHFCheckbox name="isCurrentWorking" label="Is Current Working?" />

            <Box>
              <Typography
                sx={{
                  mb: 1,
                }}
                variant="subtitle2"
              >
                Activities
              </Typography>
              {activities.map((field, index) => (
                <Box key={field.id} display="flex" alignItems="center" mb={1}>
                  <RHFTextField
                    name={`activities.${index}`}
                    placeholder="Write activities here..."
                  />
                  <IconButton
                    onClick={() => removeActivity(index)}
                    disabled={activities.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              <Button variant="outlined" onClick={() => appendActivity("")}>
                Add Activitie
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
                Create Experience
              </LoadingButton>
            </div>
          </div>
        </FormProvider>
      </div>
    </Dialog>
  );
};
