import React, { useContext } from "react";
import axios from "axios";
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
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

import { CategoryContext } from "./CategoryContext";

function CategoryTable() {
  const {
    reloadFlagMemo: { reloadFlag, setReloadFlag },
    categoriesMemo: {
      categories,
      // setCategories
    },
    categorySelectedMemo: { categorySelected, setCategorySelected },
    currentAction: {
      // categoryAction,
      setCategoryAction,
    },
  } = useContext(CategoryContext);

  const onEdit = (category) => {
    setCategorySelected(category);
    setCategoryAction("edit");
  };

  const onDelete = async (category) => {
    setCategorySelected(category);
    await axios.delete("http://localhost:4000/api/v1/category/" + category._id);
    setCategoryAction(undefined);
    setReloadFlag(reloadFlag + 1);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="right">Desciption</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell align="right">{category.description}</TableCell>
              <TableCell align="right">
                <Tooltip title="Editar categoría" arrow>
                  <IconButton onClick={() => onEdit(category)}>
                    <EditRoundedIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar categoría" arrow>
                  <IconButton onClick={() => onDelete(category)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CategoryTable;
