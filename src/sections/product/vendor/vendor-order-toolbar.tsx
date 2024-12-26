/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IOrderFilters, IOrderTableFilterValue } from "@/types/order";
import { Search } from "@mui/icons-material";

type Props = {
  filters: IOrderFilters;
  onFilters: (name: string, value: IOrderTableFilterValue) => void;
};

export default function VendorOrderTableToolbar({ filters, onFilters }: Props) {
  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters("searchTerm", event.target.value);
    },
    [onFilters]
  );

  //   const handleFilterType = useCallback(
  //     (event: SelectChangeEvent<any>) => {
  //       onFilters("type", event.target.value as any);
  //     },
  //     [onFilters]
  //   );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: "flex-end", md: "center" }}
      direction={{
        xs: "column",
        md: "row",
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        flexGrow={1}
        sx={{ width: 1 }}
      >
        <TextField
          fullWidth
          value={filters.searchTerm}
          onChange={handleFilterName}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
}
