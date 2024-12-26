import useBoolean from "@/hooks/use-boolean";
import { ICategory } from "@/types/category";
import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import SoftDeleteCategoryDialog from "./delete-category-dialog";
import { UpdateCategoryDialog } from "./edit-category-dialog";

interface Props {
  category: ICategory;
}

const CategoryRow = ({ category }: Props) => {
  const dialog = useBoolean();
  const editDialog = useBoolean();
  return (
    <>
      <TableRow key={category._id}>
        <TableCell>{category._id}</TableCell>
        <TableCell>{category.name}</TableCell>
        <TableCell>
          <img
            src={category.image}
            alt={category.name}
            style={{ width: "50px", height: "50px" }}
          />
        </TableCell>
        <TableCell>{category.slug}</TableCell>
        <TableCell>{category.isDeleted ? "Yes" : "No"}</TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <Button onClick={dialog.setTrue} variant="outlined">
              Delete
            </Button>
            <Button
              sx={{
                ml: 2,
              }}
              onClick={editDialog.setTrue}
            >
              Edit
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <SoftDeleteCategoryDialog
        categoryId={category._id}
        onClose={dialog.setFalse}
        open={dialog.value}
      />
      <UpdateCategoryDialog dialog={editDialog} initialValues={category} />
    </>
  );
};

export default CategoryRow;
