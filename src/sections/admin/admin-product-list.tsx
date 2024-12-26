/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Paper,
  Typography,
  Skeleton,
} from "@mui/material";
import { FilterList, Add } from "@mui/icons-material";
import { useGetAllProductForAdminQuery } from "@/redux/reducers/product/productApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/redux/reducers/category/categoryApi";
import ProductRow from "../project/project-row";

const TableShimmer = () => {
  const rows = 5;
  const columns = 5;

  return (
    <Table>
      <TableHead>
        <TableRow>
          {[...Array(columns)].map((_, index) => (
            <TableCell key={index}>
              <Skeleton variant="text" width="80%" />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(rows)].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {[...Array(columns)].map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton variant="rectangular" height={20} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const AdminAllProductListView = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [isLowestFirst, setIsLowestFirst] = useState(false);
  const [isOldestFirst, setIsOldestFirst] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoriesQuery();

  const { data, isFetching } = useGetAllProductForAdminQuery({
    category,
    isLowestFirst,
    isOldestFirst,
    limit,
    page: page + 1,
    searchTerm,
    ...(user?.vendor?._id && { vendorId: user.vendor._id }),
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <div className="flex items-center justify-between flex-col lg:flex-row gap-5 mb-7">
        <Typography variant="h5" fontWeight="bold">
          Admin Product List
        </Typography>

        {/* <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Add />}
          onClick={() => router.push(paths.vendor.product.create)}
        >
          Create New Product
        </Button> */}
      </div>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Box
          display="flex"
          flexDirection={{
            xs: "column",
            xl: "row",
          }}
          gap={2}
          alignItems="center"
        >
          <TextField
            label="Search Products"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ flex: 1, minWidth: "200px" }}
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            size="small"
            sx={{ flex: 1, minWidth: "200px" }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categoryData?.data?.map((item) => (
              <MenuItem value={item._id} key={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant={isLowestFirst ? "contained" : "outlined"}
            size="small"
            onClick={() => setIsLowestFirst(!isLowestFirst)}
            startIcon={<FilterList />}
          >
            {isLowestFirst ? "Price: High to Low" : "Price: Low to High"}
          </Button>
          <Button
            variant={isOldestFirst ? "contained" : "outlined"}
            size="small"
            onClick={() => setIsOldestFirst(!isOldestFirst)}
            startIcon={<FilterList />}
          >
            {isOldestFirst ? "Newest First" : "Oldest First"}
          </Button>
        </Box>
      </Paper>

      <Paper>
        <TableContainer>
          {isFetching ? (
            <TableShimmer />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Banner</TableCell>
                  <TableCell>Deleted?</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data?.data?.products?.length > 0 ? (
                  data?.data?.products.map((product) => (
                    <ProductRow project={product} key={product._id} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No Products Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {!isFetching && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.data?.pagination?.totalItems || 0}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
};

export default AdminAllProductListView;
