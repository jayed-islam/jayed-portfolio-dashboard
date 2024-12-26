import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";

import { IUser } from "@/types/user";
import { BooleanState } from "@/types/utils";
import { useUpdateUserStatusMutation } from "@/redux/reducers/user/userApi";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

interface Props {
  user: IUser;
  dialog: BooleanState;
}

const UpdateUserStatusDialog = ({ user, dialog }: Props) => {
  const [status, setStatus] = useState(user.status || "active");
  const [isBlacklisted, setIsBlacklisted] = useState(
    user.role === "vendor" ? user.vendor.isBlacklisted : false
  );

  const [updateUserStatus, { isLoading }] = useUpdateUserStatusMutation();

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as "active" | "suspended" | "blocked");
  };

  const handleBlocklistChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsBlacklisted(event.target.checked);
  };

  const handleSubmit = async () => {
    try {
      const respose = await updateUserStatus({
        userId: user._id as string,
        status,
        isBlacklisted,
      }).unwrap();

      if (respose.success) {
        toast.success("Status updated");
      } else {
        toast.error(respose.message);
      }
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  };

  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Update {user.role === "customer" ? "User" : "Vendor"} Status
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Status Field */}

          {/* Blocklist Option for Vendors Only */}
          {user.role === "vendor" ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isBlacklisted}
                  onChange={handleBlocklistChange}
                  name="blocklist"
                  color="primary"
                />
              }
              label="Blocklist Vendor"
            />
          ) : (
            <FormControl
              fullWidth
              sx={{
                mt: 3,
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialog.setFalse} variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="primary" />
          ) : (
            "Update"
          )}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserStatusDialog;
