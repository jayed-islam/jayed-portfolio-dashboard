import { useState, useEffect } from "react";

/**
 * A custom hook to debounce a value.
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds before updating the debounced value.
 * @returns The debounced value.
 */
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
