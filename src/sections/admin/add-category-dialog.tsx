/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BooleanState } from "@/types/utils";
import { Close, Image } from "@mui/icons-material";
import { createCategorySchema } from "@/validations/review";
import FormProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import { useCreateCategoryMutation } from "@/redux/reducers/category/categoryApi";

interface Props {
  dialog: BooleanState;
}

const CreateCategoryDialog = ({ dialog }: Props) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm({
    resolver: zodResolver(createCategorySchema),
  });

  const { handleSubmit } = methods;

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setErrorMessage(null); // Clear error message on new selection
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    if (!selectedImage) {
      toast.error("Please add a image");
      return;
    }

    // Append form fields
    formData.append("data", JSON.stringify(data));

    // Append the single file if selected
    if (selectedImage) {
      formData.append("file", selectedImage);
    }

    try {
      const response = await createCategory(formData).unwrap();
      if (response.success) {
        toast.success(response.message);
        setSelectedImage(null);
        dialog.setFalse();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
    }
  });

  const handleCloseError = () => {
    setErrorMessage(null);
  };

  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Create Category</h2>
        <IconButton onClick={dialog.setFalse}>
          <Close />
        </IconButton>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <div className="flex flex-col gap-3">
            <RHFTextField label="Name" name="name" />
            <RHFTextField label="Slug" name="slug" />

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-image"
              type="file"
              onChange={onImageChange}
            />
            <label htmlFor="upload-image">
              <Button
                variant="contained"
                component="span"
                size="small"
                color="info"
                sx={{
                  textTransform: "capitalize",
                }}
                startIcon={<Image />}
              >
                Add Category Image
              </Button>
            </label>
          </div>
          {selectedImage && (
            <div className="mt-5 flex items-center gap-3">
              <div className="h-20 w-20 rounded-2xl relative border p-2">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
                <div
                  onClick={removeImage}
                  className="h-6 w-6 rounded-full text-red-500 border border-red-500 absolute -right-2 -top-2 bg-red-100 flex items-center justify-center cursor-pointer"
                >
                  <Close className="text-sm" />
                </div>
              </div>
            </div>
          )}

          {errorMessage && (
            <Alert onClose={handleCloseError} severity="error" className="mt-5">
              {errorMessage}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={dialog.setFalse} color="inherit" variant="outlined">
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            color="success"
            variant="contained"
            loading={isLoading}
            disabled={isLoading}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default CreateCategoryDialog;
