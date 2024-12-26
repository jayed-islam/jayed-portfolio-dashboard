/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
  Alert,
  Button,
  Grid2,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";

import toast from "react-hot-toast";
import { useGetCategoriesQuery } from "@/redux/reducers/category/categoryApi";
import { useRouter } from "next/navigation";
import FormProvider from "@/components/hook-form/form-provider";
import { Cancel, Delete } from "@mui/icons-material";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import { LoadingButton } from "@mui/lab";
import RHFSelect from "@/components/hook-form/rhf-select-input";
import { useCreateProductMutation } from "@/redux/reducers/product/projectApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/validations/product-schema";
import { useAppSelector } from "@/redux/hooks";
import { paths } from "@/layouts/paths";

const MAX_IMAGES = 5;

export const VendorProductCreateView = () => {
  const { user } = useAppSelector((state) => state.auth);
  const methods = useForm({
    resolver: zodResolver(productSchema),
  });

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoriesQuery();

  const router = useRouter();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const { control, handleSubmit, reset } = methods;

  const {
    fields: qualitiesFields,
    append: appendQuaity,
    remove: removeQuality,
  } = useFieldArray({
    control,
    name: "qualities",
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const generateFileHash = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const hash = btoa(reader.result as string);
          resolve(hash);
        } else {
          reject("Failed to generate hash");
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      // Check if the total number of images exceeds the limit
      if (files.length + selectedImages.length > MAX_IMAGES) {
        setErrorMessage(
          `You can only upload a maximum of ${MAX_IMAGES} images.`
        );
        return;
      }

      const newFiles: File[] = [];
      const selectedImagesHashes = await Promise.all(
        selectedImages.map((file) => generateFileHash(file))
      );

      for (const file of files) {
        const fileHash = await generateFileHash(file);
        const isDuplicate = selectedImagesHashes.includes(fileHash);

        if (!isDuplicate) {
          newFiles.push(file);
        } else {
          setErrorMessage(
            "Duplicate image detected. Please select a different image."
          );
        }
      }

      setSelectedImages((prevImages) => [...prevImages, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const newData = {
      vendor: user?.vendor?._id,
      ...data,
    };

    if (selectedImages.length === 0) {
      toast.error("Minimum on image is required");
      return;
    }
    const formData = new FormData();

    // Append form fields
    formData.append("data", JSON.stringify(newData));

    // Append files
    selectedImages.forEach((file, index) => {
      formData.append("files", file);
    });

    try {
      const response = await createProduct(formData).unwrap();
      if (response.success) {
        toast.success(response.message);
        reset();
        setSelectedImages([]);
        router.push(paths.vendor.product.root);
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

  const handleCloseError = () => {
    setErrorMessage(null);
  };

  return (
    <div className="p-5 lg:p-11">
      <Typography
        sx={{
          mb: 2,
        }}
        variant="subtitle2"
      >
        Create product form
      </Typography>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid2 container spacing={3}>
          <Grid2
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <Card sx={{ pt: 5, pb: 5, px: 3 }}>
              <InputLabel>Upload Images</InputLabel>
              <input type="file" multiple onChange={onImageChange} />
              <Box mt={2}>
                {selectedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 object-cover rounded-xl border shadow-sm"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`preview ${index}`}
                          className="object-cover rounded-xl overflow-hidden h-full w-full"
                        />
                        <IconButton
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-white"
                          size="small"
                          sx={{ position: "absolute", right: 0, top: 0 }}
                        >
                          <Cancel fontSize="small" />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                )}
              </Box>
              {errorMessage && (
                <Alert
                  onClose={handleCloseError}
                  severity="error"
                  className="mt-5"
                >
                  {errorMessage}
                </Alert>
              )}
            </Card>
          </Grid2>

          <Grid2
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <Card sx={{ p: 3 }}>
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
                    <Box
                      key={field.id}
                      display="flex"
                      alignItems="center"
                      mb={1}
                    >
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

                <div className="flex items-end justify-end">
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    color="primary"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Create Product
                  </LoadingButton>
                </div>
              </div>
            </Card>
          </Grid2>
        </Grid2>
      </FormProvider>
    </div>
  );
};
