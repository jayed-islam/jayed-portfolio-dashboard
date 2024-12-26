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
import { useSoftDeleteProductMutation } from "@/redux/reducers/product/projectApi";
import toast from "react-hot-toast";
interface SoftDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string;
}

const SoftDeleteDialog: React.FC<SoftDeleteDialogProps> = ({
  open,
  onClose,
  productId,
}) => {
  const [softDeleteProduct, { isLoading }] = useSoftDeleteProductMutation();

  const handleDelete = async () => {
    try {
      const res = await softDeleteProduct({ id: productId }).unwrap();
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
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this product?</Typography>
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

export default SoftDeleteDialog;
