import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
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

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});
const drawerWidth = 240;
const Header = (props) => {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

        {["Stats", "All Jobs", "Add Job", "Profile"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton sx={{ paddingLeft: "75px" }}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
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
            justifyContent: "space-between",
            alignContent: "center",
            backgroundColor: "#ffffff",
            paddingLeft: "150px",
            paddingRight: "10px",
            marginLeft: { sm: `${drawerWidth}px` },
            width: "100%",
            height: "90px",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                noWrap
                component="div"
                color={setMaxWidth ? "primary.main" : "black"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: "30px",
                }}
              >
                {setMaxWidth ? "JobsLand" : " Dashboard"}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              alignItems="center"
              sx={{ mx: 2, mt: "28px", width: "90px", height: "30px" }}
            >
              User
            </Button>
          </Box>
          <Toolbar sx={{ display: "flex" }}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon sx={{ color: "primary.main", ml: -25, mt: -10 }} />
            </IconButton>
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
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Header;
