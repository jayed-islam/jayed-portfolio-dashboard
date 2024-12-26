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
import { useDeleteRreviewMutation } from "@/redux/reducers/review/reviewApi";

interface SoftDeleteReviewDialogProps {
  open: boolean;
  onClose: () => void;
  reviewId: string;
}

const SoftDeleteReviewDialog: React.FC<SoftDeleteReviewDialogProps> = ({
  open,
  onClose,
  reviewId,
}) => {
  const [softDeleteReview, { isLoading }] = useDeleteRreviewMutation();

  const handleDelete = async () => {
    try {
      const res = await softDeleteReview({ reviewId }).unwrap();
      if (res.success) {
        toast.success(res.message);
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.message || "An error occurred while deleting the review."
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Delete Review</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this review?</Typography>
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

export default SoftDeleteReviewDialog;
