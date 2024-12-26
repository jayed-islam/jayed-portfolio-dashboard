import React from "react";
import { TableRow, TableCell, Button, useMediaQuery } from "@mui/material";
import { IReview } from "@/types/review";
import Image from "next/image";
import SoftDeleteReviewDialog from "./delete-review-dialog";
import useBoolean from "@/hooks/use-boolean";

interface ReviewRowProps {
  review: IReview;
}

const ReviewRow: React.FC<ReviewRowProps> = ({ review }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dialog = useBoolean();

  return (
    <>
      <TableRow key={review.createdAt.toString()}>
        <TableCell>{review.product.name}</TableCell>
        <TableCell>{review.customer.name ?? "Customer"}</TableCell>
        <TableCell>{review.vendor.shopName ?? "Shop"}</TableCell>
        <TableCell>{review.rating}</TableCell>
        <TableCell>{review.content}</TableCell>
        <TableCell>{review.isDeleted ? "Yes" : "No"}</TableCell>
        {!isSmallScreen && (
          <TableCell>
            <Image
              src={review.image}
              alt="Review"
              style={{ width: 50, height: 50, objectFit: "cover" }}
              height={500}
              width={500}
            />
          </TableCell>
        )}
        {!isSmallScreen && (
          <TableCell>
            {new Date(review.createdAt).toLocaleDateString()}
          </TableCell>
        )}
        <TableCell>
          <Button
            variant="contained"
            color="secondary"
            onClick={dialog.setTrue}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <SoftDeleteReviewDialog
        onClose={dialog.setFalse}
        open={dialog.value}
        reviewId={review._id}
      />
    </>
  );
};

export default ReviewRow;
