/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useUpdateVandorLogoMutation } from "@/redux/reducers/vendor/vendorApi";
import { useAppSelector } from "@/redux/hooks";

const LogoPicker = ({}) => {
  const { user } = useAppSelector((state) => state.auth);
  const [logo, setLogo] = useState(
    (user && user?.vendor?.logo) ?? "https://via.placeholder.com/150"
  );

  const [uploadLogo, { isLoading }] = useUpdateVandorLogoMutation();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Call the upload API
      const response = await uploadLogo({
        id: user?.vendor?._id as string,
        body: formData,
      }).unwrap();

      // Update the logo on success
      if (response.success) {
        // setLogo(response.logo);
      } else {
        console.error("Failed to upload logo:", response.message);
      }
    } catch (error) {
      console.error("Failed to upload logo:", error);
    }
  };

  return (
    <Box position="relative" width={95} height={95}>
      {/* Loading Indicator */}
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          zIndex={10}
        >
          <CircularProgress size={40} color="inherit" />
        </Box>
      )}

      {/* Avatar */}
      <Avatar
        alt="Shop Logo"
        src={logo}
        sx={{
          width: 95,
          height: 95,
          cursor: "pointer",
          position: "relative",
        }}
      />

      {/* Hover Effect for Image Upload */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          opacity: 0,
          transition: "opacity 0.3s",
          "&:hover": {
            opacity: 1,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            borderRadius: "50%",
          },
        }}
      >
        <IconButton
          component="label"
          sx={{
            color: "#fff",
          }}
        >
          <PhotoCamera />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </IconButton>
      </Box>

      {/* Logo Label */}
      {!isLoading && (
        <Typography
          position="absolute"
          top="110%"
          textAlign="center"
          width="100%"
          fontSize="0.75rem"
        >
          Shop Logo
        </Typography>
      )}
    </Box>
  );
};

export default LogoPicker;
