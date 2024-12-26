/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoadingButton } from "@mui/lab";
import { BooleanState } from "@/types/utils";
import FormProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field";
import { useUpdateUserProfileMutation } from "@/redux/reducers/user/userApi";

export const profileUpdateSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

interface Props {
  dialog: BooleanState;
}

const UpdateUserProfileDialog = ({ dialog }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const methods = useForm({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (
      data.name === user?.name &&
      data.phone === user?.phone &&
      data.address === user?.address
    ) {
      toast.error("No changes detected");
      return;
    }

    const newData = {
      _id: user?._id,
      ...data,
    };

    try {
      const res = await updateUserProfile(newData).unwrap();
      if (res.success) {
        toast.success("Profile updated successfully");
        dialog.setFalse();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message || "Failed to update profile");
    }
  });

  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      fullWidth
      maxWidth="xs"
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="w-full relative p-5">
          <IconButton
            sx={{
              position: "absolute",
              top: 7,
              right: 7,
              bgcolor: "#E5E7EB",
            }}
            onClick={dialog.setFalse}
          >
            <CloseIcon />
          </IconButton>

          <div className="text-center p-4">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Update Profile
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            <RHFTextField name="name" label="Name" />
            <RHFTextField name="phone" label="Phone" />
            <RHFTextField name="address" label="Address" />
          </div>

          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            size="large"
            sx={{
              my: 2,
              textTransform: "capitalize",
            }}
          >
            Update Profile
          </LoadingButton>
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default UpdateUserProfileDialog;
