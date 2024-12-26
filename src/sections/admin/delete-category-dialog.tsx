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
import { useDeleteCategoryMutation } from "@/redux/reducers/category/categoryApi";
interface SoftDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  categoryId: string;
}

const SoftDeleteCategoryDialog: React.FC<SoftDeleteDialogProps> = ({
  open,
  onClose,
  categoryId,
}) => {
  const [softDeleteProduct, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      const res = await softDeleteProduct({ id: categoryId }).unwrap();
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
      <DialogTitle>Delete Category</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this category?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={onClose}
          color="secondary"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" disabled={isLoading}>
          {isLoading ? "Deleting..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SoftDeleteCategoryDialog;
