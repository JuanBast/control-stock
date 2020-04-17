import React, { useContext } from "react";
import axios from "axios";
import {
  TextField,
  //   InputLabel,
  //   Select,
  //   MenuItem,
  FormControl,
  Button,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import { CategoryContext } from "./CategoryContext";

const CategoryForm = () => {
  const {
    reloadFlagMemo: { reloadFlag, setReloadFlag },
    // categoriesMemo: {
    //   categories,
    //   setCategories
    // },
    categorySelectedMemo: { categorySelected, setCategorySelected },
    currentAction: { categoryAction, setCategoryAction },
  } = useContext(CategoryContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategorySelected({
      ...categorySelected,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await axios.put(
      "http://localhost:4000/api/v1/category/" + categorySelected._id,
      categorySelected
    );
    setCategoryAction(undefined);
    setReloadFlag(reloadFlag + 1);
  };

  const handleCancel = () => {
    setCategoryAction(undefined);
    setCategorySelected();
  }

  return (
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
                  margin="dense"
                  id="category_name"
                  name="name"
                  type="string"
                  disabled={categoryAction === "view"}
                  fullWidth
                  value={categorySelected.name}
                  inputProps={{ style: { textAlign: "right" } }}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>

            <TableRow key={2}>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="right">
                <TextField
                  margin="dense"
                  id="category_description"
                  name="description"
                  type="string"
                  disabled={categoryAction === "view"}
                  fullWidth
                  value={categorySelected.description}
                  inputProps={{ style: { textAlign: "right" } }}
                  onChange={handleChange}
                  multiline
                  rowsMax={4}
                />
              </TableCell>
            </TableRow>

            <TableRow key="buttons">
              <TableCell align="center">
                <Button variant="contained" color="primary"
                    onClick={handleSubmit}
                >
                  <CheckIcon />
                  Aceptar
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" color="secondary"
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
  );
};

export default CategoryForm;
