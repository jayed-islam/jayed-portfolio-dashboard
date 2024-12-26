/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  MenuItem,
  TextFieldProps,
  TextField,
  SxProps,
  Theme,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

type Option = {
  value: string | number;
  label: string;
};

type Props = TextFieldProps & {
  name: string;
  label: string;
  native?: boolean;
  maxHeight?: boolean | number;
  options: Option[];
  PaperProps?: SxProps<Theme>;
};

const RHFSelect: React.FC<Props> = ({
  name,
  label,
  options,
  native,
  helperText,
  maxHeight = 221,
  PaperProps,
  ...others
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          select
          fullWidth
          SelectProps={{
            native,
            MenuProps: {
              PaperProps: {
                sx: {
                  ...(!native && {
                    maxHeight:
                      typeof maxHeight === "number" ? maxHeight : "unset",
                  }),
                  ...PaperProps,
                },
              },
            },
          }}
          error={!!error}
          helperText={error ? error.message : helperText}
          {...others}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default RHFSelect;
