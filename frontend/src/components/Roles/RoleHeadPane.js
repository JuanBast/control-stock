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

import SecurityIcon from "@material-ui/icons/Security";

import RoleContext from "./RoleContext"

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: 40,
  },
  flex: {
    flexGrow: 1,
  },
}));

export default function RoleHeadPane() {
  const classes = useStyles();

  const {
    roleActionMemo: { setRoleAction },
    roleSelectedMemo: { setRoleSelected },
  } = useContext(RoleContext)

  const handleAdd = () => {
    setRoleSelected({})
    setRoleAction("add")
  }

  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <SecurityIcon className={classes.font} />
          </IconButton>

          <Typography variant="h6" className={classes.flex}>
            Roles
          </Typography>

          <Tooltip title="Crear rol" arrow>
            <IconButton color="inherit" onClick={handleAdd}>
              <Icon className={classes.font}>add_circle</Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
