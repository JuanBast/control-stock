import React, { useContext } from "react";

import {
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import { useFormik } from "formik";
import * as Yup from "yup";
// import { object, string, max, required, number, email, min } from "yup";

import RoleContext from "./RoleContext";
import RoleController from "./RoleController";
import { prettyTimeStamp } from "../../utils/";

const RoleForm = () => {
  const {
    roleSelectedMemo: { roleSelected, setRoleSelected },
    roleActionMemo: { roleAction, setRoleAction },
    reloadFlagMemo: { reloadFlag, setReloadFlag },
  } = useContext(RoleContext);

  const handleSubmit = async (values) => {
    if (roleAction === "add") {
      await RoleController.createRole(values);
      setRoleSelected({});
      setRoleAction(undefined);
      setReloadFlag(reloadFlag + 1);
    } else if (roleAction === "edit") {
      await RoleController.updateRole(roleSelected._id, values);
      setRoleSelected({});
      setRoleAction(undefined);
      setReloadFlag(reloadFlag + 1);
    }
  };

  const handleCancel = () => {
    setRoleSelected(undefined);
    setRoleAction(undefined);
  };

  const formik = useFormik({
    initialValues: {
      rolename: roleSelected.rolename,
      description: roleSelected.description,
      createdAt: roleSelected.createdAt,
      updatedAt: roleSelected.updatedAt,
    },
    validationSchema: Yup.object({
      rolename: Yup.string().required("El campo nombre es obligatorio"),
      description: Yup.string().required("El campo descripción es obligatorio"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Campo</TableCell>
                <TableCell align="right">Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={1}>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="rolename"
                    {...formik.getFieldProps("rolename")}
                    error={
                      formik.touched.rolename && formik.errors.rolename
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.rolename && formik.errors.rolename
                        ? formik.errors.rolename
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={roleAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={2}>
                <TableCell align="left">Descripción</TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="description"
                    {...formik.getFieldProps("description")}
                    error={
                      formik.touched.description && formik.errors.description
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                        ? formik.errors.description
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={roleAction === "view"}
                  />
                </TableCell>
              </TableRow>

              {roleAction === "view" ? (
                <React.Fragment>
                  <TableRow key={6}>
                    <TableCell align="left">Creado el</TableCell>
                    <TableCell align="right">
                      <TextField
                        fullWidth
                        id="createdAt"
                        value={prettyTimeStamp(formik.values.createdAt)}
                        inputProps={{ style: { textAlign: "right" } }}
                        disabled={true}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow key={7}>
                    <TableCell align="left">Modificado el</TableCell>
                    <TableCell align="right">
                      <TextField
                        fullWidth
                        id="updatedAt"
                        value={prettyTimeStamp(formik.values.updatedAt)}
                        inputProps={{ style: { textAlign: "right" } }}
                        disabled={true}
                      />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ) : null}

              <TableRow key="buttons">
                <TableCell align="center">
                  {roleAction === "view" ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCancel}
                    >
                      <CloseIcon />
                      Aceptar
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" type="submit">
                      <CheckIcon />
                      Aceptar
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    <CloseIcon />
                    Cancelar
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </form>
  );
};

export default RoleForm;
