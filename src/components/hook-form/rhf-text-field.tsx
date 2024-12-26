/* eslint-disable @typescript-eslint/no-unused-vars */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
  readOnly?: boolean;
};

const RHFTextField: React.FC<Props> = ({
  name,
  type,
  helperText,
  disabled,
  readOnly = false,
  ...others
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          variant="outlined"
          {...field}
          type={showPassword ? "text" : type}
          value={type === "number" && field.value === 0 ? "" : field.value}
          fullWidth
          onChange={(event) => {
            if (type === "number") {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          disabled={disabled}
          inputProps={
            disabled || readOnly ? { style: { cursor: "not-allowed" } } : {}
          }
          error={!!error}
          helperText={error ? error.message : helperText}
          {...others}
          InputProps={
            type === "password"
              ? {
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }
              : undefined
          }
        />
      )}
    />
  );
};

export default RHFTextField;
