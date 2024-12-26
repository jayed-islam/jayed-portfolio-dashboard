/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Checkbox, FormControlLabel, CheckboxProps } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

type Props = CheckboxProps & {
  name: string;
  label?: string;
};

const RHFCheckbox: React.FC<Props> = ({ name, label, ...others }) => {
  const { control, setValue } = useFormContext(); // Access setValue from useFormContext

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...others}
              checked={!!field.value} // Ensure it gets the boolean value
              onChange={(e) => {
                const checked = e.target.checked;
                field.onChange(checked); // Update field value
                setValue(name, checked); // Explicitly set the value in form state
              }}
            />
          }
          label={label || ""}
        />
      )}
    />
  );
};

export default RHFCheckbox;
