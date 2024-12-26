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
  Paper,
  Typography,
  Box,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useAppSelector } from "@/redux/hooks";
import { useGetReviewAllReviewsForVendorQuery } from "@/redux/reducers/review/reviewApi";

const VendorReviewView = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetReviewAllReviewsForVendorQuery(
    {
      vendorId: user?.vendor?._id as string,
    },
    { skip: !user }
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Vendor Reviews
      </Typography>
      {isLoading ? (
        <Box>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={50}
              sx={{ marginBottom: 2, borderRadius: 1 }}
            />
          ))}
        </Box>
      ) : data && data?.data?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Customer</TableCell>
                <TableCell align="left">Product</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="left">Comment</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((review: any) => (
                <TableRow key={review._id}>
                  <TableCell align="left">
                    {review.customer?.name ?? "Anonymous"}
                  </TableCell>
                  <TableCell align="left">
                    {review.product?.name ?? "Unknown Product"}
                  </TableCell>
                  <TableCell align="center">{review.rating}</TableCell>
                  <TableCell align="left">{review.comment}</TableCell>
                  <TableCell align="right">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box textAlign="center" mt={3}>
          <Typography variant="body1" color="textSecondary">
            No reviews available.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VendorReviewView;
