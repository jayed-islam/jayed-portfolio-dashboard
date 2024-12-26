import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";
import BlogRow from "../blog-row";
import { useGetBlogsQuery } from "@/redux/reducers/blog/blogApi";
import useBoolean from "@/hooks/use-boolean";
import { BlogCreateDialog } from "../blog-create-dialog";

// Shimmer Skeleton for loading state
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

const BlogListView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isFetching } = useGetBlogsQuery({
    searchTerm,
    limit,
    page: page + 1,
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

  const dialog = useBoolean();

  return (
    <Box>
      <div className="flex items-center justify-between flex-col lg:flex-row gap-5 mb-7">
        <Typography variant="h5" fontWeight="bold">
          Blog List
        </Typography>
        <Button onClick={dialog.setTrue}>Create Blog</Button>
      </div>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Box display="flex" flexDirection="row" gap={2} alignItems="center">
          <TextField
            label="Search Blogs"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ flex: 1, minWidth: "200px" }}
          />
          <Button
            variant={sortOrder === "asc" ? "contained" : "outlined"}
            size="small"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            startIcon={<FilterList />}
          >
            {sortOrder === "asc" ? "Sort: Descending" : "Sort: Ascending"}
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
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data?.data?.blogs.length > 0 ? (
                  data?.data?.blogs.map((blog) => (
                    <BlogRow blog={blog} key={blog._id} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No Blogs Found
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
      <BlogCreateDialog dialog={dialog} />
    </Box>
  );
};

export default BlogListView;
