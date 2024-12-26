/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  useMediaQuery,
} from "@mui/material";
import {
  useGetTransactionListQuery,
  useUpdatePaymentStatusMutation,
} from "@/redux/reducers/order/orderApi";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

const AdminTransactionListView: React.FC = () => {
  const {
    data: transactions,
    isFetching,
    error,
  } = useGetTransactionListQuery();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdatePaymentStatusMutation();

  const handleUpdateStatus = async (
    transactionId: string,
    newStatus: string
  ) => {
    try {
      const res = await updateStatus({ transactionId, newStatus }).unwrap();
      if (res.success) {
        toast.success("updated");
      } else {
        toast.error(res.message ?? "somthing went wrong");
      }
    } catch (err: any) {
      alert(err?.message || "Failed to update payment status.");
    }
  };

  if (isFetching) {
    return <Typography>Loading transactions...</Typography>;
  }

  if (error) {
    return <Typography color="error">Failed to load transactions</Typography>;
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Transaction list</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Payment Status</TableCell>
              {!isSmallScreen && <TableCell>Created At</TableCell>}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.data.map((transaction) => (
              <TableRow key={transaction.transactionId}>
                <TableCell>{transaction.user?.name || "N/A"}</TableCell>
                <TableCell>{transaction.vendor?.shopName || "N/A"}</TableCell>
                <TableCell>{transaction.order?._id || "N/A"}</TableCell>
                <TableCell>{`${transaction.currency} ${transaction.amount}`}</TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell>{transaction.paymentStatus}</TableCell>
                {!isSmallScreen && (
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                )}
                <TableCell>
                  <LoadingButton
                    variant="contained"
                    loading={isUpdating}
                    color="primary"
                    onClick={() =>
                      handleUpdateStatus(transaction.transactionId, "COMPLETED")
                    }
                    disabled={transaction.paymentStatus === "COMPLETED"}
                  >
                    Mark as Completed
                  </LoadingButton>
                  <LoadingButton
                    variant="outlined"
                    color="secondary"
                    loading={isUpdating}
                    onClick={() =>
                      handleUpdateStatus(transaction.transactionId, "FAILED")
                    }
                    disabled={transaction.paymentStatus === "FAILED"}
                    style={{ marginLeft: 8 }}
                  >
                    Mark as Failed
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminTransactionListView;
