/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Button, Dialog, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";

import RHFTextField from "@/components/hook-form/rhf-text-field";
import FormProvider from "@/components/hook-form/form-provider";
import { BooleanState } from "@/types/utils";
import RHFDatePicker from "@/components/hook-form/rhf-date-picker";
import { updateExperienceValidationSchema } from "@/validations/exp";
import { useUpdateExperienceMutation } from "@/redux/reducers/experience/experienceApi";
import { IExperience } from "@/types/esp";
import RHFCheckbox from "@/components/hook-form/rhf-checkbox";

interface Props {
  dialog: BooleanState;
  defaultvalues: IExperience;
}

export const EditExpDialog = ({ dialog, defaultvalues }: Props) => {
  const methods = useForm({
    resolver: zodResolver(updateExperienceValidationSchema),
    defaultValues: defaultvalues,
  });

  const [updateExperience, { isLoading }] = useUpdateExperienceMutation();

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { dirtyFields, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updateExperience({
        id: defaultvalues._id,
        updates: data,
      }).unwrap();
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

  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      maxWidth="sm"
      fullWidth
    >
      <div className="p-5 lg:p-11">
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Update Experience
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
                Update Experience
              </LoadingButton>
            </div>
          </div>
        </FormProvider>
      </div>
    </Dialog>
  );
};
