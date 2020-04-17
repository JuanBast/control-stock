import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Icon,
  Grid,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PeopleIcon from "@material-ui/icons/People";

import axios from "axios";

import UserDialog from "./UserDialog";
import { UserContext } from "./UserContext";
import { getRandomColor } from "../../utils/";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    //   flexWrap: 'wrap',
    "& > *": {
      margin: "10px",
    },
  },
}));

export default function UserPage() {
  const classes = useStyles();

  const {
    usersData: {
      users,
      // setUsers
    },
    // rolesData: {
    //   roles,
    //   setRoles
    // },
    userDialog: {
      // userDialogOpen,
      setUserDialogOpen,
    },
    currentUser: {
      // userSelected,
      setUserSelected,
    },
    currentAction: {
      // userAction,
      setUserAction,
    },
    currentRenderFlag: { renderFlag, setRenderFlag },
  } = useContext(UserContext);

  const onUserView = (user) => {
    setUserAction("view");
    setUserSelected(user);
    setUserDialogOpen(true);
  };

  const onUserAdd = () => {
    setUserAction("add");
    setUserSelected(null);
    setUserDialogOpen(true);
  };

  const onUserEdit = (user) => {
    setUserAction("edit");
    setUserSelected(user);
    setUserDialogOpen(true);
  };

  const onUserDelete = async (id) => {
    await axios.delete("http://localhost:4000/api/v1/user/" + id);
    setRenderFlag(renderFlag + 1);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div style={{ flexGrow: 1 }}>
          <Grid container>
            <AppBar position="static">
              <Toolbar>
                <IconButton color="inherit">
                  <PeopleIcon style={{ fontSize: 40 }} />
                </IconButton>

                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Usuarios
                </Typography>

                <Tooltip title="Crear usuario" arrow>
                  <IconButton color="inherit" onClick={onUserAdd}>
                    <Icon style={{ fontSize: 40 }}>add_circle</Icon>
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
          </Grid>
        </div>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Usuario</TableCell>
                <TableCell align="center">Rol</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="center">
                    <Avatar style={{ background: getRandomColor() }}>
                      {`${user.name
                        .charAt(0)
                        .toUpperCase()}${user.surname.charAt(0).toUpperCase()}`}
                    </Avatar>
                  </TableCell>
                  <TableCell align="center">
                    {user.name + " " + user.surname}
                  </TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">
                    {user.role.rolename.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Ver usuario" arrow>
                      <IconButton onClick={() => onUserView(user)}>
                        <VisibilityIcon color="primary" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar usuario" arrow>
                      <IconButton onClick={() => onUserEdit(user)}>
                        <EditRoundedIcon color="primary" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar usuario" arrow>
                      <IconButton onClick={() => onUserDelete(user._id)}>
                        <DeleteIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <UserDialog />
    </div>
  );
}
