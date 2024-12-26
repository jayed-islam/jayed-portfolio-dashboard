"use client";

import React from "react";
import { useGetAllCategoryForAdminQuery } from "@/redux/reducers/category/categoryApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import CategoryRow from "./category-row";
import useBoolean from "@/hooks/use-boolean";
import CreateCategoryDialog from "./add-category-dialog";

const AdminCategoryListView = () => {
  const { data, isLoading, isError } = useGetAllCategoryForAdminQuery();
  const dialog = useBoolean();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories</div>;

  return (
    <div>
      {/* Button to create a new category */}
      <h3 className="text-2xl font-semibold mb-5">All Categories</h3>
      <Button
        onClick={dialog.setTrue}
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Create New Category
      </Button>

      {/* Table displaying the categories */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Is Deleted</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((category) => (
              <CategoryRow category={category} key={category._id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateCategoryDialog dialog={dialog} />
    </div>
  );
};

export default AdminCategoryListView;
