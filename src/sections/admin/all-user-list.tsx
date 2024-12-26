/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Typography,
  Pagination,
} from "@mui/material";
import { useGetUsersForAdminQuery } from "@/redux/reducers/user/userApi";
import UserRow from "./user-row";

const AllUserListView = () => {
  const [tabValue, setTabValue] = useState("customer");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isFetching, error } = useGetUsersForAdminQuery({
    role: tabValue,
    search,
    limit,
    page,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    setPage(1); // Reset to page 1 when search is applied
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        All Users
      </Typography>

      {/* Tabs for Customer and Vendor */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ marginBottom: 2 }}
      >
        <Tab label="Customer" value="customer" />
        <Tab label="Vendor" value="vendor" />
      </Tabs>

      {/* Filter Section */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search Users"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, minWidth: "200px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                {tabValue === "vendor" ? "Shop name" : "Name"}
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Error loading data.
                </TableCell>
              </TableRow>
            ) : data && data?.data?.users?.length > 0 ? (
              data.data.users.map((user) => (
                <UserRow user={user} key={user._id} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={data?.data?.pagination?.totalPages || 0}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default AllUserListView;
