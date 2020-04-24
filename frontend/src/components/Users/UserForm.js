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
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import { useFormik } from "formik";
import * as Yup from "yup";
// import { object, string, max, required, number, email, min } from "yup";

import UserContext from "./UserContext";
import UserController from "./UserController";
import { prettyTimeStamp } from "../../utils/";

const UserForm = () => {
  const {
    userSelectedMemo: { userSelected, setUserSelected },
    userActionMemo: { userAction, setUserAction },
    reloadFlagMemo: { reloadFlag, setReloadFlag },
    rolesMemo: { roles },
  } = useContext(UserContext);

  const handleSubmit = async (values) => {

    const theUser = {
      ...values,
      role: roles.filter((item) => item.rolename === values.role.toLowerCase())[0],
    };

    if (userAction === "add") {
      await UserController.createUser(theUser);
      setUserSelected({});
      setUserAction(undefined);
      setReloadFlag(reloadFlag + 1);
    } else if (userAction === "edit") {
      await UserController.updateUser(userSelected._id, theUser);
      setUserSelected({});
      setUserAction(undefined);
      setReloadFlag(reloadFlag + 1);
    }
  };

  const handleCancel = () => {
    setUserSelected(undefined);
    setUserAction(undefined);
  };

  var userRole;
  if (typeof userSelected.role != "undefined") {
    userRole = userSelected.role.rolename.toUpperCase();
  } else {
    userRole = "";
  }

  const formik = useFormik({
    initialValues: {
      name: userSelected.name,
      surname: userSelected.surname,
      dni: userSelected.dni,
      email: userSelected.email,
      address: userSelected.address,
      telephone: userSelected.telephone,
      username: userSelected.username,
      role: userRole,
      createdAt: userSelected.createdAt,
      updatedAt: userSelected.updatedAt,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El campo nombre es obligatorio"),
      surname: Yup.string().required("El campo apellido es obligatorio"),
      dni: Yup.number("El campo DNI solo acepta numeros enteros").required(
        "El campo DNI es obligatorio"
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
      username: Yup.string().required("El campo username es obligatorio"),
      role: Yup.string().required("El campo rol es obligatorio"),
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
                    disabled={userAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={2}>
                <TableCell align="left">Apellido</TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="surname"
                    {...formik.getFieldProps("surname")}
                    error={
                      formik.touched.surname && formik.errors.surname
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.surname && formik.errors.surname
                        ? formik.errors.surname
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={userAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={3}>
                <TableCell align="left">DNI</TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="dni"
                    {...formik.getFieldProps("dni")}
                    error={
                      formik.touched.dni && formik.errors.dni ? true : false
                    }
                    helperText={
                      formik.touched.dni && formik.errors.dni
                        ? formik.errors.dni
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={userAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={4}>
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
                    disabled={userAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={5}>
                <TableCell align="left">Domicilio</TableCell>
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
                    disabled={userAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={6}>
                <TableCell align="left">Teléfono</TableCell>
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
                    disabled={userAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={7}>
                <TableCell align="left">Username</TableCell>
                <TableCell align="right">
                  <TextField
                    fullWidth
                    id="username"
                    {...formik.getFieldProps("username")}
                    error={
                      formik.touched.username && formik.errors.username
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                        ? formik.errors.username
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={userAction === "view"}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={8}>
                <TableCell align="left">Rol</TableCell>
                <TableCell align="right">
                  {/* <TextField
                    fullWidth
                    id="role"
                    {...formik.getFieldProps("role")}
                    error={
                      formik.touched.role && formik.errors.role
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.role && formik.errors.role
                        ? formik.errors.role
                        : null
                    }
                    inputProps={{ style: { textAlign: "right" } }}
                    disabled={userAction === "view"}
                  /> */}
                  <FormControl
                  fullWidth
                    error={
                      formik.touched.role && formik.errors.role ? true : false
                    }
                  >
                    <Select
                      fullWidth
                      id="role"
                      {...formik.getFieldProps("role")}
                      value={
                        formik.values.role
                          ? formik.values.role.toLowerCase()
                          : ""
                      }
                      disabled={userAction === "view"}
                    >
                      {roles.map((item) => (
                        <MenuItem value={item.rolename} key={item.rolename}>
                          {item.rolename.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>

                    <FormHelperText>
                      {formik.touched.role && formik.errors.role
                        ? formik.errors.role
                        : null}
                    </FormHelperText>
                  </FormControl>
                </TableCell>
              </TableRow>

              {userAction === "view" ? (
                <React.Fragment>
                  <TableRow key={9}>
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

                  <TableRow key={10}>
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
                  {userAction === "view" ? (
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

export default UserForm;
