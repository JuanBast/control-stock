import React, { useContext, useState } from "react";

import {
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Avatar,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import UserContext from "./UserContext";
import UserController from "./UserController";
import ConfirmDialog from "../Common/ConfirmDialog";

import { getRandomColor } from "../../utils/";

export default function UserTable() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    reloadFlagMemo: { reloadFlag, setReloadFlag },
    usersMemo: { users },
    userSelectedMemo: { userSelected, setUserSelected },
    userActionMemo: { setUserAction },
  } = useContext(UserContext);

  const onView = (user) => {
    setUserAction("view");
    setUserSelected(user);
  };

  const onEdit = (user) => {
    setUserAction("edit");
    setUserSelected(user);
  };

  const onDelete = (user) => {
    setUserSelected(user);
    setConfirmOpen(true);
  };

  const deleteUser = async () => {
    await UserController.deleteUser(userSelected._id);
    setUserAction(undefined);
    setUserSelected({});
    setReloadFlag(reloadFlag + 1);
  };

  return (
    <div>
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
                    {`${user.name.charAt(0).toUpperCase()}${user.surname
                      .charAt(0)
                      .toUpperCase()}`}
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
                    <IconButton onClick={() => onView(user)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar usuario" arrow>
                    <IconButton onClick={() => onEdit(user)}>
                      <EditRoundedIcon color="primary" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Eliminar usuario" arrow>
                    <IconButton onClick={() => onDelete(user)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="right">Descripción</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell align="right">{user.description}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver usuario" arrow>
                    <IconButton onClick={() => onView(user)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar usuario" arrow>
                    <IconButton onClick={() => onEdit(user)}>
                      <EditRoundedIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar usuario" arrow>
                    <IconButton onClick={() => onDelete(user)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <ConfirmDialog
        title="Borrar Usuario?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deleteUser}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <HighlightOffIcon color="secondary" />
                </TableCell>
                <TableCell align="right">Desea eliminar el Usuario?</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ConfirmDialog>
    </div>
  );
}
