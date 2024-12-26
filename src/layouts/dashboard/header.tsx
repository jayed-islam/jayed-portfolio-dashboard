import React from "react";
import {
  Typography,
  IconButton,
  useMediaQuery,
  Theme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { paths } from "../paths";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <Box
      className="bg-white shadow px-5 py-5"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Sidebar toggle button (visible on mobile/tablet) */}
      {!isDesktop && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Dashboard title */}
      <Link href={paths.root}>
        <Typography
          variant="h6"
          component="div"
          color="textPrimary"
          sx={{
            fontWeight: "bold",
            flex: 1,
            textAlign: isDesktop ? "left" : "center",
            ml: isDesktop ? "265px" : "0",
          }}
        >
          Bekreta Home
        </Typography>
      </Link>

      {isDesktop && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1" className="text-gray-500">
            Welcome, User!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Header;
