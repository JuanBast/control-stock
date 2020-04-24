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

import RoleContext from "./RoleContext";
import RoleController from "./RoleController";
import ConfirmDialog from "../Common/ConfirmDialog";

import { getRandomColor } from "../../utils/";

export default function RoleTable() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    rolesMemo: {
      roles,
      // setRoles
    },
    roleSelectedMemo: { roleSelected, setRoleSelected },
    roleActionMemo: {
      // roleAction,
      setRoleAction,
    },
    reloadFlagMemo: { reloadFlag, setReloadFlag },
  } = useContext(RoleContext);

  const onView = (role) => {
    setRoleAction("view");
    setRoleSelected(role);
  };

  const onEdit = (role) => {
    setRoleAction("edit");
    setRoleSelected(role);
  };

  const onDelete = (role) => {
    setRoleSelected(role);
    setConfirmOpen(true);
  };

  const deleteRole = async () => {
    await RoleController.deleteRole(roleSelected._id);
    setRoleAction(undefined);
    setRoleSelected({});
    setReloadFlag(reloadFlag + 1);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="right">Descripción</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role._id}>
                <TableCell align="center">
                  <Avatar style={{ background: getRandomColor() }}>
                    {`${role.rolename.charAt(0).toUpperCase()}`}
                  </Avatar>
                </TableCell>

                <TableCell component="th" scope="row">
                  {role.rolename}
                </TableCell>
                <TableCell align="right">{role.description}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver rol" arrow>
                    <IconButton onClick={() => onView(role)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar rol" arrow>
                    <IconButton onClick={() => onEdit(role)}>
                      <EditRoundedIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar rol" arrow>
                    <IconButton onClick={() => onDelete(role)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        title="Borrar Rol?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deleteRole}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <HighlightOffIcon color="secondary" />
                </TableCell>
                <TableCell align="right">Desea eliminar el Rol?</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ConfirmDialog>
    </div>
  );
}
