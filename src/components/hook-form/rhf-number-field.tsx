import { Controller, useFormContext } from "react-hook-form";
import { ReactNode } from "react";

type RHFNumberFieldProps = {
  name: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  icon?: ReactNode;
  className?: string;
};

export default function RHFNumberField({
  name,
  type = "text",
  placeholder,
  helperText,
  icon,
  className,
}: RHFNumberFieldProps) {
  const { control, setValue } = useFormContext();

  const sanitizeValue = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const sanitizedValue = sanitizeValue(inputValue);
    setValue(name, sanitizedValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div
            className={`relative flex items-start h-[3.25rem] rounded-[0.625rem] w-full flex-col ${className}`}
          >
            {icon && (
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                {icon}
              </span>
            )}
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`h-[3.25rem] w-full px-4 pl-12 rounded-[0.625rem] border outline-none font-inter 
              ${
                error
                  ? "border-red-500 focus:ring-red-600 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } 
              focus:ring-1`}
              onChange={handleChange}
            />
          </div>
          {helperText && !error && (
            <p className="mt-1 text-sm text-gray-500 font-inter">
              {helperText}
            </p>
          )}
          {error && (
            <p className="mt-1 text-xs text-red-600 font-inter">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
