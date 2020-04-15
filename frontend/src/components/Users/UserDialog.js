import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Avatar from "@material-ui/core/Avatar";

import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDialog({
  open,
  closeUserDialog,
  user,
  userAction,
}) {
    
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    if (userAction === "edit") {
      async function getRoles() {
        const result = await axios.get("http://localhost:4000/api/v1/role");
        setRoles(result.data);
      }
      getRoles();
      console.log(roles);
    }
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    closeUserDialog();
  };

  const prettyTimeStamp = (timestamp) => {
    // const date = timestamp.substring(0, 10);
    // const time = timestamp.substring(11, timestamp.length - 1);
    // return `${date} ${time}`;
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

  if (user) {
    _id = user._id;
    name = user.name;
    surname = user.surname;
    dni = user.dni;
    email = user.email;
    address = user.address;
    telephone = user.telephone;
    username = user.username;
    rolename = user.role.rolename.toUpperCase();
    createdAt = prettyTimeStamp(user.createdAt);
    updatedAt = prettyTimeStamp(user.updatedAt);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" align="center">
          {/* <AccountCircleIcon fontSize="large" /> */}
          <Avatar>
            {user ? `${name.charAt(0)}${surname.charAt(0)}` : "U"}
          </Avatar>

          <br />
          <DialogContentText id="alert-dialog-slide-description" align="center">
            Datos del usuario {name + " " + surname}
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
                    />
                  </TableCell>
                </TableRow>
                <TableRow key={_id + "8"}>
                  <TableCell component="th" scope="row">
                    Rol
                  </TableCell>
                  <TableCell align="right">
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
                  </TableCell>
                </TableRow>
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
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
