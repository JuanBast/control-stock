import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  Paper,
  Typography,
  IconButton,
  // Tooltip,
  Avatar,
  Icon,
  Grid,
  AppBar,
  Toolbar,
  List,
  ListItem,
  // ListItemText,
} from "@material-ui/core";

import grey from '@material-ui/core/colors/grey';

import SecurityIcon from "@material-ui/icons/Security";

import { getRandomColor } from "../../utils/";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "10px",
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

// const useStyles = makeStyles((theme) => ({
//     root: {
//       width: '100%',
//       height: 400,
//       maxWidth: 300,
//       backgroundColor: theme.palette.background.paper,
//     },
//   }));

export default function RolePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div style={{ flexGrow: 1 }}>
          <Grid container>
            <AppBar position="static">
              <Toolbar>
                <IconButton color="inherit">
                  <SecurityIcon style={{ fontSize: 40 }} />
                </IconButton>

                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Roles
                </Typography>

                <IconButton color="inherit" /*onClick={onUserAdd}*/>
                  <Icon style={{ fontSize: 40 }}>add_circle</Icon>
                </IconButton>
              </Toolbar>
            </AppBar>
          </Grid>

          <Grid container>
            <Grid item>
              <Paper>
                <List component="nav" aria-label="secondary mailbox folders" style={{ background: grey[300] }}>
                  <ListItem button>
                    <Avatar style={{ background: getRandomColor() }}>AD</Avatar>
                    {/* <ListItemText primary="ADMIN" /> */}
                    <Typography
                      variant="subtitle1"
                      style={{ paddingLeft: "10px", flexGrow: 1 }}
                    >
                      ADMIN
                    </Typography>
                  </ListItem>
                  <ListItem button>
                    <Avatar style={{ background: getRandomColor() }}>US</Avatar>
                    {/* <ListItemText primary="  USER" /> */}
                    <Typography
                      variant="subtitle1"
                      style={{ paddingLeft: "10px", flexGrow: 1 }}
                    >
                      USER
                    </Typography>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper style={{ background: '#2A2625' }}>Hola</Paper>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}
