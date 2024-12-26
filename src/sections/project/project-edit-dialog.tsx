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
import {
  createProjectValidationSchema,
  updateProjectValidationSchema,
} from "@/validations/projects";
import { BooleanState } from "@/types/utils";
import RHFDatePicker from "@/components/hook-form/rhf-date-picker";
import { useUpdateProjectMutation } from "@/redux/reducers/project/projectApi";

const StyledAutocompletePaper = styled("div")(({ theme }) => ({
  border: "1px solid #ccc",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  backgroundColor: "white",
}));

interface Props {
  initialValues: IProject;
  dialog: BooleanState;
}

export const UpdateProjectView = ({ initialValues, dialog }: Props) => {
  const methods = useForm({
    resolver: zodResolver(updateProjectValidationSchema),
    defaultValues: {
      ...initialValues,
      isPublished: initialValues?.isPublished ?? false,
    },
  });

  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { dirtyFields },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const updatePayload: Partial<IProject> = Object.keys(dirtyFields).reduce(
      (acc: Partial<IProject>, field: string) => {
        if (field in data) {
          (acc as any)[field] = data[field as keyof IProject];
        }
        return acc;
      },
      {} as Partial<IProject>
    );

    try {
      const response = await updateProject({
        id: initialValues._id,
        data: updatePayload,
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
          Create Project
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
