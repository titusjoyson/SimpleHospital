import * as React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import AppBar from "./AppBar";
import AppDrawer from "./AppDrawer";

export default function PermanentDrawerRight() {
  const location = useLocation();
  const pathname = location.pathname.slice(-1) === '/' ? location.pathname.slice(0, -1) : location.pathname;
  const title = pathname.split("/").pop().split("-").join(" ");
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", bgcolor: "rgb(238, 242, 246)", flex: 1 }}>
      <CssBaseline />
      <AppBar onMenuButtonClick={() => setDrawerOpen(!drawerOpen)} />
      <AppDrawer open={drawerOpen} />
      <Box component="main" sx={{ height: "100vh", width: "100%" }}>
        <Toolbar />
        <Box sx={{ p: 3, display: "flex", flex: 1, flexDirection: "column" }}>
          <Paper sx={{ marginBottom: 2 }} elevation={0}>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Typography
                color="text.primary"
                p={1}
                sx={{ textTransform: "capitalize" }}
              >
                {title}
              </Typography>
            </Breadcrumbs>
          </Paper>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
