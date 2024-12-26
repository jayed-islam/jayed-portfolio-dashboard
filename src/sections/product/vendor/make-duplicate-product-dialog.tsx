/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";
import { useDuplicateProductMutation } from "@/redux/reducers/product/projectApi";

interface DuplicateDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string;
}

const DuplicateDialog: React.FC<DuplicateDialogProps> = ({
  open,
  onClose,
  productId,
}) => {
  const [duplicateProduct, { isLoading }] = useDuplicateProductMutation();

  const handleDuplicate = async () => {
    try {
      const res = await duplicateProduct({ id: productId }).unwrap();
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Box sx={{ textAlign: "center", p: 3 }}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Duplicate Product</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to duplicate this product? This will create an
            exact copy of the product.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="secondary"
            sx={{ width: 120 }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDuplicate}
            variant="contained"
            color="primary"
            sx={{ width: 120 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DuplicateDialog;
