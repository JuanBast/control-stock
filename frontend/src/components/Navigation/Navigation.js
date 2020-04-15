import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import DrawerMenu from "./DrawerMenu";
import LoginDialog from "./LoginDialog"
import { NavContext } from "./NavContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation() {
  const classes = useStyles();

  const [openDrawerMenu, setOpenDrawerMenu] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawerMenu({ ...openDrawerMenu, [anchor]: open });
  };

  const drawerMenu = React.useMemo(
    () => ({ openDrawerMenu, setOpenDrawerMenu }),
    [openDrawerMenu, setOpenDrawerMenu]
  );

  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const dialogLogin = React.useMemo(
    () => ({ openLoginDialog, setOpenLoginDialog }),
    [openLoginDialog, setOpenLoginDialog]
  );

  const initialValue = {
    drawerMenu,
    dialogLogin,
    toggleDrawer,
  };

  // const login = (event) => {
  //   console.log("Login clicked!");
  // };

  return (
    <NavContext.Provider value={initialValue}>
      <div className={classes.root}>
        <Grid container>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Control de Stock
              </Typography>

              <Button
                variant="outlined"
                color="inherit"
                startIcon={<AccountCircleIcon />}
                onClick={() => setOpenLoginDialog(true)}
              >
                Login
              </Button>

              
            </Toolbar>
          </AppBar>
          <DrawerMenu />
          <LoginDialog />
        </Grid>
      </div>
    </NavContext.Provider>
  );
}
