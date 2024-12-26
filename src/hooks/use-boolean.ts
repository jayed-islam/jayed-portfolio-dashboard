"use client";

import { BooleanState } from "@/types/utils";
import { useCallback, useState } from "react";

const useBoolean = (initialValue?: boolean): BooleanState => {
  const [value, setValue] = useState(!!initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prevValue) => !prevValue), []);

  return { value, setTrue, setFalse, toggle, setValue };
};

export default useBoolean;
