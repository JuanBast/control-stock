import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  IconButton,
  Icon,
  Grid,
  AppBar,
  Toolbar,
  Tooltip,
} from "@material-ui/core";

import PeopleIcon from "@material-ui/icons/People";

import UserContext from "./UserContext";

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: 40,
  },
  flex: {
    flexGrow: 1,
  },
}));

export default function UserHeadPane() {
  const classes = useStyles();

  const {
    userSelectedMemo: { setUserSelected },
    userActionMemo: { setUserAction },
  } = useContext(UserContext);

  const handleAdd = () => {
    setUserSelected({});
    setUserAction("add");
  };

  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <PeopleIcon className={classes.font} />
          </IconButton>

          <Typography variant="h6" className={classes.flex}>
            Usuarios
          </Typography>

          <Tooltip title="Crear usuario" arrow>
            <IconButton color="inherit" onClick={handleAdd}>
              <Icon className={classes.font}>add_circle</Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
