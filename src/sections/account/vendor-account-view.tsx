"use client";

import React from "react";
import { Box, Typography, Card, Button } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import UpdateVendorProfileDilaog from "./update-vendor-profile";
import useBoolean from "@/hooks/use-boolean";
import { useAppSelector } from "@/redux/hooks";
import LogoPicker from "./vendor-logo-picker";

const VendorAccountView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dialog = useBoolean();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box
      className="p-4"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Shop Profile Section */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 3,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "start",
              gap: 3,
            }}
          >
            <LogoPicker />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {(user && user?.vendor?.shopName) ?? "Change Shop Name"}
              </Typography>
              <Typography variant="body1" color="textSecondary" mt={1}>
                Welcome to our shop! We offer the best products at amazing
                prices.
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                <strong>Contact:</strong>{" "}
                {(user && user?.vendor?.contactPhone) ?? "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                <strong>Email:</strong> {(user && user?.email) ?? "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                <strong>Address:</strong>{" "}
                {(user && user?.vendor?.address) ?? "N/A"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  fontWeight: "bold",
                }}
                onClick={dialog.setTrue}
              >
                Update Profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
      <UpdateVendorProfileDilaog dialog={dialog} />
    </Box>
  );
};

export default VendorAccountView;
