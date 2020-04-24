import React, { useContext } from "react";
import axios from "axios";
import {
  TextField,
  Button,
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

import CategoryContext from "./CategoryContext";

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

    if (categoryAction === "view") {
        handleCancel();
    }

    if (categoryAction === "add") {
      await axios.post(
        "http://localhost:4000/api/v1/category/",
        categorySelected
      );
    }

    if (categoryAction === "edit") {
      await axios.put(
        "http://localhost:4000/api/v1/category/" + categorySelected._id,
        categorySelected
      );
    }
    setCategoryAction(undefined);
    setCategorySelected({});
    setReloadFlag(reloadFlag + 1);
  };

  const handleCancel = () => {
    setCategoryAction(undefined);
    setCategorySelected({});
  };

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
                  value={
                    typeof categorySelected !== undefined &&
                    typeof categorySelected.name !== undefined
                      ? categorySelected.name
                      : ""
                  }
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
                  value={
                    typeof categorySelected !== undefined &&
                    typeof categorySelected.description !== undefined
                      ? categorySelected.description
                      : ""
                  }
                  inputProps={{ style: { textAlign: "right" } }}
                  onChange={handleChange}
                  multiline
                  rowsMax={4}
                />
              </TableCell>
            </TableRow>

            {categoryAction === "view" ? (
              <React.Fragment>
                <TableRow key={3}>
                  <TableCell align="left">Creado el</TableCell>
                  <TableCell align="right">
                    <TextField
                      margin="dense"
                      id="category_createdAt"
                      name="createdAt"
                      type="string"
                      disabled={true}
                      fullWidth
                      value={
                        typeof categorySelected !== undefined &&
                        typeof categorySelected.createdAt !== undefined
                          ? categorySelected.createdAt
                          : ""
                      }
                      inputProps={{ style: { textAlign: "right" } }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow key={4}>
                  <TableCell align="left">Modificado el</TableCell>
                  <TableCell align="right">
                    <TextField
                      margin="dense"
                      id="category_updatedAt"
                      name="updatedAt"
                      type="string"
                      disabled={true}
                      fullWidth
                      value={
                        typeof categorySelected !== undefined &&
                        typeof categorySelected.updatedAt !== undefined
                          ? categorySelected.updatedAt
                          : ""
                      }
                      inputProps={{ style: { textAlign: "right" } }}
                    />
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ) : null}

            <TableRow key="buttons">
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  <CheckIcon />
                  Aceptar
                </Button>
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
  );
};

export default CategoryForm;
