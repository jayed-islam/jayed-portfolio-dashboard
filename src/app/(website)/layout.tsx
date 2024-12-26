import { AuthGuard } from "@/auth/guard/auth-guard";
import DashboardLayout from "@/layouts/dashboard";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const WebsiteLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>;
    </AuthGuard>
  );
};

export default WebsiteLayout;
