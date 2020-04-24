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

import SupplierContext from "./SupplierContext";
import SupplierController from "./SupplierController";
import { prettyTimeStamp } from "../../utils/";

const SuppliersForm = () => {
  // let Yup = require("yup");

  const {
    supplierSelectedMemo: { supplierSelected, setSupplierSelected },
    currentAction: { supplierAction, setSupplierAction },
    reloadFlagMemo: { reloadFlag, setReloadFlag },
  } = useContext(SupplierContext);

  const handleSubmit = async (values) => {
    if (supplierAction === "add") {
      await SupplierController.createSupplier(values);
      setSupplierSelected({});
      setSupplierAction(undefined);
      setReloadFlag(reloadFlag + 1);
    } else if (supplierAction === "edit") {
      await SupplierController.updateSupplier(supplierSelected._id, values)
      setSupplierSelected({});
      setSupplierAction(undefined);
      setReloadFlag(reloadFlag + 1);
    }
  };

  const handleCancel = () => {
    setSupplierSelected({});
    setSupplierAction(undefined);
  };

  const formik = useFormik({
    initialValues: {
      name: supplierSelected.name,
      cuit: supplierSelected.cuit,
      email: supplierSelected.email,
      address: supplierSelected.address,
      telephone: supplierSelected.telephone,
      createdAt: supplierSelected.createdAt,
      updatedAt: supplierSelected.updatedAt,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(150, "El nombre debe tener como maximo 150 caracteres")
        .required("El nombre es un campo requerido"),
      cuit: Yup.number("El campo CUIT solo acepta numeros enteros").required(
        "El CUIT es un campo requerido"
      ),
      email: Yup.string()
        .email("Debe ingresar un email válido")
        .required("Debe ingresar un email válido"),
      address: Yup.string()
        .min(5, "El domicilio debe tener como minimo 5 caracteres")
        .max(150, "El domicilio debe tener como maximo 150 caracteres")
        .required("El domicilio es un campo requerido"),
      telephone: Yup.number(
        "El campo telefono solo acepta numeros enteros"
      ).required("El campo telefono es obligatorio"),
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
                    id="name"
                    {...formik.getFieldProps("name")}
                    error={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                    helperText={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={supplierAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={2}>
                <TableCell align="left">CUIT</TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="cuit"
                    {...formik.getFieldProps("cuit")}
                    error={
                      formik.touched.cuit && formik.errors.cuit ? true : false
                    }
                    helperText={
                      formik.touched.cuit && formik.errors.cuit
                        ? formik.errors.cuit
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={supplierAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={3}>
                <TableCell align="left">Email</TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="email"
                    {...formik.getFieldProps("email")}
                    error={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={supplierAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={4}>
                <TableCell align="left">Dirección</TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="address"
                    {...formik.getFieldProps("address")}
                    error={
                      formik.touched.address && formik.errors.address
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.address && formik.errors.address
                        ? formik.errors.address
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={supplierAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={5}>
                <TableCell align="left">Telefono</TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="telephone"
                    {...formik.getFieldProps("telephone")}
                    error={
                      formik.touched.telephone && formik.errors.telephone
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.telephone && formik.errors.telephone
                        ? formik.errors.telephone
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={supplierAction === "view"}
                  />
                </TableCell>
              </TableRow>

              {supplierAction === "view" ? (
                <React.Fragment>
                  <TableRow key={6}>
                    <TableCell align="left">Creado el</TableCell>
                    <TableCell align="right">
                      <TextField
                        fullWidth
                        id="createdAt"
                        {...formik.getFieldProps("createdAt")}
                        value={prettyTimeStamp(formik.values.createdAt)}
                        error={
                          formik.touched.createdAt && formik.errors.createdAt
                            ? true
                            : false
                        }
                        helperText={
                          formik.touched.createdAt && formik.errors.createdAt
                            ? formik.errors.createdAt
                            : null
                        }
                        inputProps={{ style: { textAlign: "right" } }}
                        disabled={supplierAction === "view"}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow key={7}>
                    <TableCell align="left">Modificado el</TableCell>
                    <TableCell align="right">
                      <TextField
                        fullWidth
                        id="updatedAt"
                        {...formik.getFieldProps("updatedAt")}
                        value={prettyTimeStamp(formik.values.updatedAt)}
                        error={
                          formik.touched.updatedAt && formik.errors.updatedAt
                            ? true
                            : false
                        }
                        helperText={
                          formik.touched.updatedAt && formik.errors.updatedAt
                            ? formik.errors.updatedAt
                            : null
                        }
                        inputProps={{ style: { textAlign: "right" } }}
                        disabled={supplierAction === "view"}
                      />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ) : null}

              <TableRow key="buttons">
                <TableCell align="center">
                  {supplierAction === "view" ? (
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

export default SuppliersForm;
