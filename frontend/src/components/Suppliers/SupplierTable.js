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

import SupplierContext from "./SupplierContext";
import SupplierController from "./SupplierController";
import ConfirmDialog from "../Common/ConfirmDialog";

import { getRandomColor } from "../../utils/";

export default function SupplierTable() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    suppliersMemo: {
      suppliers,
      // setSuppliers
    },
    supplierSelectedMemo: { supplierSelected, setSupplierSelected },
    currentAction: {
      // supplierAction,
      setSupplierAction,
    },
    reloadFlagMemo: { reloadFlag, setReloadFlag },
  } = useContext(SupplierContext);

  const onView = (supplier) => {
    setSupplierSelected(supplier);
    setSupplierAction("view");
  };

  const onEdit = (supplier) => {
    setSupplierSelected(supplier);
    setSupplierAction("edit");
  };

  const onDelete = (supplier) => {
    setSupplierSelected(supplier);
    setConfirmOpen(true);
  };

  const deleteSupplier = async () => {
    await SupplierController.deleteSupplier(supplierSelected._id);
    setSupplierAction(undefined);
    setSupplierSelected({});
    setReloadFlag(reloadFlag + 1);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="right">CUIT</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier._id}>
                <TableCell align="center">
                  <Avatar style={{ background: getRandomColor() }}>
                    {`${supplier.name
                      .charAt(0)
                      .toUpperCase()}${supplier.name.charAt(1).toUpperCase()}`}
                  </Avatar>
                </TableCell>

                <TableCell component="th" scope="row">
                  {supplier.name}
                </TableCell>
                <TableCell align="right">{supplier.cuit}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver proveedor" arrow>
                    <IconButton onClick={() => onView(supplier)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar proveedor" arrow>
                    <IconButton onClick={() => onEdit(supplier)}>
                      <EditRoundedIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar proveedor" arrow>
                    <IconButton onClick={() => onDelete(supplier)}>
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
        title="Borrar Proveedor?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deleteSupplier}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <HighlightOffIcon color="secondary" />
                </TableCell>
                <TableCell align="right">
                  Desea eliminar el proveedor?
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ConfirmDialog>
    </div>
  );
}
