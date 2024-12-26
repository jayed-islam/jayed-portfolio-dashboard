import { AuthGuard } from "@/auth/guard/auth-guard";
import { PermissionGuard } from "@/auth/guard/permission-guard";
import DashboardLayout from "@/layouts/dashboard";
import { USER_ROLE } from "@/types/user";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const VendorLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <PermissionGuard hasContent roles={[USER_ROLE.admin]}>
        <DashboardLayout>{children}</DashboardLayout>
      </PermissionGuard>
    </AuthGuard>
  );
};

export default VendorLayout;
