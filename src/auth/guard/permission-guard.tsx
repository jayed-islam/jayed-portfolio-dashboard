"use client";

import React, { FC } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import { UserRoles } from "@/types/user";
import Link from "next/link";
import { paths } from "@/layouts/paths";

type PermissionGuardProp = {
  hasContent?: boolean;
  roles: UserRoles[];
  children: React.ReactNode;
};

export const PermissionGuard: FC<PermissionGuardProp> = ({
  hasContent,
  roles,
  children,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const userRole = user?.role;
  const isPermitted =
    userRole && (userRole === "admin" || roles.includes(userRole));

  if (!isPermitted) {
    const message = "You do not have permission to access this page.";
    let roleMessage = "";

    if (userRole) {
      // Custom messages based on the user's role
      if (roles.includes("admin")) {
        roleMessage = `As an ${userRole}, you do not have admin-level permissions to access this page.`;
      } else if (roles.includes("vendor")) {
        roleMessage = `As a ${userRole}, you do not have vendor-level permissions to access this page.`;
      } else if (roles.includes("customer")) {
        roleMessage = `As a ${userRole}, you do not have customer-level permissions to access this page.`;
      }
    }

    return hasContent ? (
      <Container
        sx={{
          textAlign: "center",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "51vh",
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: 2, fontWeight: "bold", color: "error.main" }}
        >
          Permission Denied
        </Typography>
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "1.2rem",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          {roleMessage || message}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 2 }}>
          You do not have permission to access this page.
        </Typography>
        <Link href={paths.root}>
          <Button variant="contained" color="error" sx={{ fontWeight: "bold" }}>
            Go Back
          </Button>
        </Link>
      </Container>
    ) : null;
  }

  return <>{children}</>;
};

export default PermissionGuard;
