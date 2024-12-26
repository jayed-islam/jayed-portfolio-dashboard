"use client";

import { useAppSelector } from "@/redux/hooks";
import { UserRoles } from "@/types/user";
import { FC } from "react";

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: UserRoles[];
  children: React.ReactNode;
};

export const RoleBasedGuard: FC<RoleBasedGuardProp> = ({
  hasContent,
  roles,
  children,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const isAdmin = roles?.includes(user?.role as UserRoles);

  if (typeof user?.role !== "undefined" && !isAdmin) {
    return hasContent ? (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-600">Permission Denied</h1>
        <p className="text-lg mt-4">
          You do not have permission to access this page
        </p>
      </div>
    ) : null;
  }
  return <>{children}</>;
};
