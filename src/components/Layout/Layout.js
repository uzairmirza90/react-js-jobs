import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect, useLayoutEffect } from "react";
import IconButton from "@mui/material/IconButton";
import logoImage from "../../assets/logo.jpg";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { padding, width } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddJob from "../AddJob/addJob";
import Profile from "../Profile/profile";
import AllJobs from "../All-Jobs/all-jobs";
import StatsData from "../Stats/statsData";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { auth } from "../../Firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});
const drawerWidth = 240;
const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("jobs-land-user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };
  const menuItemHandler = async () => {
    setAnchorEl(null);
    localStorage.removeItem("jobs-land-user");

    await signOut(auth);

    navigate("/login");
  };
  const setMaxWidth = useMediaQuery("(max-width:600px)");

  const drawer = (
    <div>
      <List>
        <Box
          sx={{ display: "flex", alignItems: "center", mb: "30px", mt: "15px" }}
        >
          <img src={logoImage} alt="logoImage" width={70} />
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: "primary.main",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            JobsLand
          </Typography>
        </Box>

        <ListItem>
          <ListItemButton
            component={Link}
            sx={{ paddingLeft: "75px" }}
            to="/stats"
          >
            <ListItemText primary="Stats" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            sx={{ paddingLeft: "75px" }}
            to="/all-jobs"
          >
            <ListItemText primary="All Jobs" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            sx={{ paddingLeft: "75px" }}
            to="/add-job"
          >
            <ListItemText primary="Add Job" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            sx={{ paddingLeft: "75px" }}
            to="/profile"
          >
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            paddingLeft: setMaxWidth ? "10px" : "20px",
            paddingRight: "10px",
            marginLeft: { xs: "0", sm: `${drawerWidth}px` },
            width: "100%",
            height: "90px",
            boxShadow: "none",
          }}
        >
          <Toolbar
            sx={{ display: "flex", width: "100%", paddingRight: "20px" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "flex-start",
              }}
            >
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{
                  display: { sm: "none" },
                  color: "primary.main",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                noWrap
                component="div"
                color={setMaxWidth ? "primary.main" : "black"}
                sx={{
                  ml: setMaxWidth ? 0 : 13,
                  fontSize: { xs: "25px", sm: "28px" },
                }}
              >
                {setMaxWidth ? "JobsLand" : "Dashboard"}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              endIcon={<ArrowDropDownIcon />}
              sx={{ maxWidth: "130px", fontSize: { xs: "13px", sm: "20px" } }}
            >
              {user && user.name && user.name.charAt(0)}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>{user && user.name}</MenuItem>
              <MenuItem onClick={menuItemHandler}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                border: "none",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                border: "none",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Layout;
