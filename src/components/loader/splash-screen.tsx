"use client";

import { useEffect, useState } from "react";

import React from "react";

export const SplashScreen = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-white absolute right-0 bottom-0 w-full z-[9999]">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-green-500 border-t-transparent"></div>
    </div>
  );
};
