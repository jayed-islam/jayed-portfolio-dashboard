/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

type Props = {
  name: string;
  label: string;
  readOnly?: boolean;
  disabled?: boolean;
};

const RHFDatePicker: React.FC<Props> = ({
  name,
  label,
  readOnly = false,
  disabled = false,
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
        <DatePicker
          label={label}
          value={field.value ? dayjs(field.value) : null}
          //   onChange={(newValue) =>
          //     field.onChange(newValue ? newValue.toISOString() : null)
          //   }
          //   value={field.value ? dayjs(field.value) : null}
          //   onChange={(date: Dayjs | null) => {
          //     field.onChange(date ? date.toISOString() : null);
          //   }}
          onChange={(date: Dayjs | null) =>
            field.onChange(date ? date.toDate() : null)
          }
          disabled={disabled || readOnly}
        />
      )}
    />
  );
};

export default RHFDatePicker;
