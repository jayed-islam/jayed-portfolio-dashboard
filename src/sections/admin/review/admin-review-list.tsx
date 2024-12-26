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
  useMediaQuery,
} from "@mui/material";
import { useGetReviewForAdminQuery } from "@/redux/reducers/review/reviewApi";
import ReviewRow from "./admin-review-row";

const AdminReviewList: React.FC = () => {
  const { data: reviews, isFetching, error } = useGetReviewForAdminQuery();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  if (isFetching) return <Typography>Loading reviews...</Typography>;
  if (error) return <Typography>Error fetching reviews.</Typography>;

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Review list</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Product</strong>
              </TableCell>
              <TableCell>
                <strong>Customer</strong>
              </TableCell>
              <TableCell>
                <strong>Vendor</strong>
              </TableCell>
              <TableCell>
                <strong>Rating</strong>
              </TableCell>
              <TableCell>
                <strong>Content</strong>
              </TableCell>
              <TableCell>
                <strong>Is Deleted?</strong>
              </TableCell>
              {!isSmallScreen && (
                <TableCell>
                  <strong>Image</strong>
                </TableCell>
              )}
              {!isSmallScreen && (
                <TableCell>
                  <strong>Created At</strong>
                </TableCell>
              )}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews?.data.map((review, idx) => (
              <ReviewRow review={review} key={idx} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminReviewList;
