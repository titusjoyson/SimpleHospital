import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { drawerWidth, drawerMenuItems } from "./const";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function AppDrawer({ open }) {
  const [selectedItemIdx, setSelectedItemIdx] = useState();

  const setSelectedItem = (index) => {
    setSelectedItemIdx(index === selectedItemIdx ? null : index);
  };

  return (
    <Drawer open={open} variant="permanent">
      <Toolbar />
      <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
        <List>
          {drawerMenuItems.map((item, index) => {
            const expandable = item?.items?.length > 0;
            const itemOpen = selectedItemIdx === index;
            return (
              <>
                <ListItem key={item.label} disablePadding>
                  <ListItemButton onClick={() => setSelectedItem(index)}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                    {expandable ? (
                      itemOpen ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  key={item.label}
                  in={itemOpen && expandable}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item?.items?.map((subItem, subIndex) => {
                      return (
                        <ListItemButton sx={{ pl: 2 }} key={subItem.label}>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary={subItem.label} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </>
            );
          })}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}

AppDrawer.defaultProps = {
  open: true,
};

export default AppDrawer;
