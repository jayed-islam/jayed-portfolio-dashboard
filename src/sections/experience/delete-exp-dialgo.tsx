/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useDeleteExperienceMutation } from "@/redux/reducers/experience/experienceApi";

interface SoftDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  expId: string;
}

const ExpDeleteDialog: React.FC<SoftDeleteDialogProps> = ({
  open,
  onClose,
  expId,
}) => {
  const [softDeleteProject, { isLoading }] = useDeleteExperienceMutation();

  const handleDelete = async () => {
    try {
      const res = await softDeleteProject(expId).unwrap();
      if (res.success) {
        toast.success(res.message);
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Delete Experience</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this Experience?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" disabled={isLoading}>
          {isLoading ? "Deleting..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpDeleteDialog;
