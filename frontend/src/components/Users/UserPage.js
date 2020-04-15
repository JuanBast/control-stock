import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography, IconButton, Tooltip } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PeopleIcon from "@material-ui/icons/People";

import UserDialog from "./UserDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    "& > *": {
      margin: "10px",
    },
  },
}));

export default function UserPage({ users }) {
  const classes = useStyles();

  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [userSelected, setUserSelected] = useState()
  const [userAction, setUserAction] = useState()

  const onUserView = (user) => {
    setUserSelected(user)
    setUserDialogOpen(true)
    setUserAction("view")
    console.log("userAction: ", userAction)
  };

  const closeUserDialog = () => {
    setUserDialogOpen(false)
  };

  const onUserEdit = (user) => {
    setUserAction("edit")
    setUserSelected(user)
    setUserDialogOpen(true)
    console.log("Editing user: ", user._id)
    console.log("userAction: ", userAction)
  };

  const onUserDelete = (id) => {
    console.log("Delete user: ", id);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Typography variant="h5" align="center">
          <PeopleIcon fontSize="large" style={{ marginTop: "5px" }} />
        </Typography>
        <Typography variant="h6" align="center">
          Usuarios
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
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
                    {user.name + " " + user.surname}
                  </TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.role.rolename}</TableCell>
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
      <UserDialog
        open={userDialogOpen}
        closeUserDialog={closeUserDialog}
        user={userSelected}
        userAction={userAction}
      />
    </div>
  );
}
