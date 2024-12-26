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
  Box,
  Paper,
  Typography,
  Skeleton,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import useBoolean from "@/hooks/use-boolean";
import { useGetExperiencesQuery } from "@/redux/reducers/experience/experienceApi";
import ExperienceRow from "../exp-row";
import { CreateExpDialog } from "../exp-create-dialog";

const TableShimmer = () => {
  const rows = 5;
  const columns = 6;

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

const ExperienceListView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isFetching } = useGetExperiencesQuery({
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
          Experience List
        </Typography>
        <Button onClick={dialog.setTrue}>Create Experience</Button>
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
            label="Search Experiences"
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
                  <TableCell>Company</TableCell>
                  <TableCell>Dates</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data?.data?.experiences.length > 0 ? (
                  data?.data?.experiences.map((experience) => (
                    <ExperienceRow
                      experience={experience}
                      key={experience._id}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No Experiences Found
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
      <CreateExpDialog dialog={dialog} />
    </Box>
  );
};

export default ExperienceListView;
