/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect } from "react";
import isEqual from "lodash/isEqual";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import { alpha } from "@mui/material/styles";
import { useGetAdminOrderListQuery } from "@/redux/reducers/order/orderApi";
import useDebounce from "@/hooks/use-debounce";
import { IOrder, IOrderFilters, ORDER_STATUS } from "@/types/order";
import {
  Box,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import VendorOrderTableToolbar from "../vendor-order-toolbar";
import TableHeadCustom from "@/components/elements/table-custom-header";
import VendorOrderTableFilterResult from "../vendor-order-filter-result";
import VendorOrderTableRow from "../vendor-order-table-row";
import TableCustomSkeleton from "@/components/elements/table-custom-skeleton";
import { useAppSelector } from "@/redux/hooks";

const TABLE_HEAD = [
  { id: "", label: "", width: 51 },
  { id: "id", label: "Order ID", width: 201 },
  { id: "phone", label: "Phone", width: 151 },
  { id: "address", label: "Address", width: 251 },
  { id: "createdAt", label: "Created At", width: 251 },
  { id: "total", label: "Total Price", width: 101 },
  { id: "status", label: "Status", width: 101 },
  { id: "", width: 88 },
];

const defaultFilters: IOrderFilters = {
  endDate: null,
  startDate: null,
  limit: 10,
  page: 0,
  sortBy: "latest",
  searchTerm: "",
  status: "pending",
};

export default function VendorOrderListView() {
  const { user } = useAppSelector((state) => state.auth);
  const [filters, setFilters] = useState(defaultFilters);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<string>("createdAt");
  const [tableData, setTableData] = useState<IOrder[]>([]);

  const searchQuery = useDebounce(filters.searchTerm, 500);

  const { data, isFetching } = useGetAdminOrderListQuery({
    endDate: filters.endDate && filters.endDate,
    startDate: filters.startDate && filters.startDate,
    limit: filters.limit,
    page: filters.page + 1,
    sortBy: order === "desc" ? "latest" : "oldest",
    searchTerm: searchQuery,
    status: filters.status,
    vendorId: user?.vendor?._id,
  });

  useEffect(() => {
    if (data?.data) {
      setTableData(data.data.orders);
    }
  }, [data?.data, filters.page, filters.limit]);

  const totalItems = data?.data.pagination.totalItems || 0;

  const dataFiltered = tableData;
  const dataInPage = dataFiltered;

  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback((name: string, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleResetFilters = () => setFilters(defaultFilters);

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div>
      <Typography variant="h4" mb={3}>
        Order List
      </Typography>
      <Card elevation={2} sx={{ borderRadius: 3 }}>
        <Tabs
          value={filters.status}
          onChange={(e, value) => handleFilters("status", value)}
          sx={{
            px: 2.5,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {ORDER_STATUS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    backgroundColor:
                      tab.value === filters.status
                        ? "success.main"
                        : "grey.400",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "0.875rem",
                  }}
                >
                  {tab.value === "all"
                    ? data?.data.pagination.totalItems
                    : tab.value === "pending"
                    ? data?.data.meta.pending
                    : tab.value === "confirmed"
                    ? data?.data.meta.confirmed
                    : tab.value === "shipped"
                    ? data?.data.meta.shipped
                    : tab.value === "delivered"
                    ? data?.data.meta.delivered
                    : tab.value === "cancelled"
                    ? data?.data.meta.cancelled
                    : tableData.length}
                </Box>
              }
            />
          ))}
        </Tabs>
        <VendorOrderTableToolbar filters={filters} onFilters={handleFilters} />
        {canReset && (
          <VendorOrderTableFilterResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}
        <TableContainer>
          <Table>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              onSort={handleSort}
            />
            <TableBody>
              {(isFetching
                ? Array.from({ length: filters.limit })
                : dataInPage
              ).map((row, index) =>
                row ? (
                  <VendorOrderTableRow key={index} row={row as IOrder} />
                ) : (
                  <TableCustomSkeleton key={index} />
                )
              )}
              {!isFetching && !tableData.length && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={totalItems}
          rowsPerPage={filters.limit}
          page={filters.page}
          onPageChange={(e, newPage) => handleFilters("page", newPage)}
          onRowsPerPageChange={(e) =>
            handleFilters("limit", parseInt(e.target.value, 10))
          }
        />
      </Card>
    </div>
  );
}
