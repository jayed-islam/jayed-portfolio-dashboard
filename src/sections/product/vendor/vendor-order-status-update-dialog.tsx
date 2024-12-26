/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import toast from "react-hot-toast";
import { Typography } from "@mui/material";
import { useUpdateOrderStatusMutation } from "@/redux/reducers/order/orderApi";
import { LoadingButton } from "@mui/lab";

type StatusUpdateDialogProps = {
  open: boolean;
  onClose: () => void;
  status: string;
  orderId: string;
};

export default function VendorOrderStatusUpdateDialog({
  open,
  onClose,
  status,
  orderId,
}: StatusUpdateDialogProps) {
  const [selectedStatus, setSelectedStatus] = React.useState<
    string | undefined
  >(undefined);

  const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation(undefined);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedStatus) {
      toast.error("Please select a status");
      return;
    }
    try {
      const res = await updateStatus({
        orderId,
        status: selectedStatus,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Update Order Status</DialogTitle>
      <DialogContent>
        <div className="w-full md:w-[25rem]">
          <Typography
            variant="body2"
            sx={{
              pb: 2,
            }}
          >
            Current Status: <strong>{status}</strong>
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus ?? ""}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancel
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          color="success"
          disabled={selectedStatus === status || isLoading}
          loading={isLoading}
        >
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
