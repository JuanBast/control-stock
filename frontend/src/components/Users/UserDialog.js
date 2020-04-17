import React, { useContext } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@material-ui/core";

import axios from "axios";

import { UserContext } from "./UserContext";
import { getRandomColor } from '../../utils/'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDialog() {
  const {
    // usersData: { users, setUsers },
    rolesData: {
      roles,
      // setRoles
    },
    userDialog: { userDialogOpen, setUserDialogOpen },
    currentUser: { userSelected, setUserSelected },
    currentAction: { userAction, setUserAction },
    // currentAction: { userAction },
    currentRenderFlag: { renderFlag, setRenderFlag },
  } = useContext(UserContext);

  const prettyTimeStamp = (timestamp) => {
    var date = new Date(timestamp);

    var curr_date = date.getDate();
    var curr_month = date.getMonth();
    var curr_year = date.getFullYear();

    var curr_hour = date.getHours();
    var curr_minutes = date.getMinutes();
    var curr_seconds = date.getSeconds();

    return `${curr_date}-${curr_month}-${curr_year} ${curr_hour}:${curr_minutes}:${curr_seconds}`;
  };

  var {
    _id,
    name,
    surname,
    dni,
    email,
    address,
    telephone,
    username,
    rolename,
    createdAt,
    updatedAt,
  } = "";

  if (userSelected) {
    _id = userSelected._id;
    name = userSelected.name;
    surname = userSelected.surname;
    dni = userSelected.dni;
    email = userSelected.email;
    address = userSelected.address;
    telephone = userSelected.telephone;
    username = userSelected.username;

    // if(undefined !== userSelected.role.rolename)
    // if(("rolename" in userSelected.role)){
    if (typeof userSelected.role != "undefined") {
      rolename = userSelected.role.rolename.toUpperCase();
    } else {
      rolename = "";
    }
    // rolename = undefined !== userSelected.role.rolename ? userSelected.role.rolename.toUpperCase() : "";
    createdAt = prettyTimeStamp(userSelected.createdAt);
    updatedAt = prettyTimeStamp(userSelected.updatedAt);
  }

  const handleClose = () => {
    setUserDialogOpen(false);
    setUserAction();
    setUserSelected();
    setRenderFlag(renderFlag + 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    if (name === "role") {
      const newRole = roles.filter((role) => role.rolename === value);
      newValue = {
        _id: newRole[0]._id,
        rolename: newRole[0].rolename,
      };
    }
    setUserSelected({
      ...userSelected,
      [name]: newValue,
    });
  };

  const handleSubmit = async () => {
    const newRole = roles.filter(
      (role) => role.rolename === userSelected.role.rolename
    );
    const newIdRole = {
      _id: newRole[0]._id,
      rolename: newRole[0].rolename,
    };
    const newUser = {
      ...userSelected,
      role: newIdRole,
    };
    if (userAction === "edit") {
      await axios.put(
        "http://localhost:4000/api/v1/user/" + newUser._id,
        newUser
      );
    } else if (userAction === "add") {
      await axios.post("http://localhost:4000/api/v1/user", newUser);
    }

    // setUsers([...users.filter((user) => user._id !== newUser._id), newUser]);
    handleClose();
    // refreshPage();
  };

//   const refreshPage = () => {
//     window.location.reload(false);
//   };

  return (
    <div>
      <Dialog
        open={userDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" align="center">
          <Avatar
            style={{background: getRandomColor()}}
          >
            {userAction === undefined || userAction === "add"
              ? "U?"
              : `${name.charAt(0).toUpperCase()}${surname
                  .charAt(0)
                  .toUpperCase()}`}
          </Avatar>
          <DialogContentText id="alert-dialog-slide-description" align="center">
            Datos del usuario
          </DialogContentText>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Campo</TableCell>
                  <TableCell align="right">Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={_id + "1"}>
                  <TableCell component="th" scope="row">
                    Nombre
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="user_name"
                      name="name"
                      type="string"
                      disabled={userAction === "view"}
                      fullWidth
                      value={name}
                      inputProps={{ style: { textAlign: "right" } }}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow key={_id + "2"}>
                  <TableCell component="th" scope="row">
                    Apellido
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="user_surname"
                      name="surname"
                      type="string"
                      disabled={userAction === "view"}
                      fullWidth
                      value={surname}
                      inputProps={{ style: { textAlign: "right" } }}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow key={_id + "3"}>
                  <TableCell component="th" scope="row">
                    DNI
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="user_dni"
                      name="dni"
                      type="string"
                      disabled={userAction === "view"}
                      fullWidth
                      value={dni}
                      inputProps={{ style: { textAlign: "right" } }}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow key={_id + "4"}>
                  <TableCell component="th" scope="row">
                    Domicilio
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="user_address"
                      name="address"
                      type="string"
                      disabled={userAction === "view"}
                      fullWidth
                      value={address}
                      inputProps={{ style: { textAlign: "right" } }}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow key={_id + "5"}>
                  <TableCell component="th" scope="row">
                    Telefono
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="user_telephone"
                      name="telephone"
                      type="string"
                      disabled={userAction === "view"}
                      fullWidth
                      value={telephone}
                      inputProps={{ style: { textAlign: "right" } }}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow key={_id + "6"}>
                  <TableCell component="th" scope="row">
                    Email
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="user_email"
                      name="email"
                      type="string"
                      disabled={userAction === "view"}
                      fullWidth
                      value={email}
                      inputProps={{ style: { textAlign: "right" } }}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow key={_id + "7"}>
                  <TableCell component="th" scope="row">
                    Usuario
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="user_username"
                      name="username"
                      type="string"
                      disabled={userAction === "view"}
                      fullWidth
                      value={username}
                      inputProps={{ style: { textAlign: "right" } }}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow key={_id + "8"}>
                  <TableCell component="th" scope="row">
                    Rol
                  </TableCell>
                  <TableCell align="right">
                    {userAction === "view" ? (
                      <TextField
                        autoFocus
                        margin="dense"
                        id="user_rolename"
                        name="rolename"
                        type="string"
                        disabled={userAction === "view"}
                        fullWidth
                        value={rolename}
                        inputProps={{ style: { textAlign: "right" } }}
                      />
                    ) : (
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">
                          Rol
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={rolename ? rolename.toLowerCase() : ""}
                          onChange={handleChange}
                          name="role"
                        >
                          {roles.map((role) => (
                            <MenuItem value={role.rolename} key={role.rolename}>
                              {role.rolename.toUpperCase()}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </TableCell>
                </TableRow>
                {userAction !== undefined && userAction !== "add" ? (
                  <React.Fragment>
                    <TableRow key={_id + "9"}>
                      <TableCell component="th" scope="row">
                        Creado el
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          autoFocus
                          margin="dense"
                          id="user_createdAt"
                          name="createdAt"
                          type="string"
                          disabled={true}
                          fullWidth
                          value={createdAt}
                          inputProps={{ style: { textAlign: "right" } }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow key={_id + "10"}>
                      <TableCell component="th" scope="row">
                        Modificado el
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          autoFocus
                          margin="dense"
                          id="user_updatedAt"
                          name="updatedAt"
                          type="string"
                          disabled={true}
                          fullWidth
                          value={updatedAt}
                          inputProps={{ style: { textAlign: "right" } }}
                        />
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
