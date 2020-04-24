import React, { useContext } from "react";

import {
  Typography,
  IconButton,
  Icon,
  Grid,
  AppBar,
  Toolbar,
  Tooltip,
} from "@material-ui/core";

import CategoryIcon from "@material-ui/icons/Category";
import CategoryContext from "./CategoryContext";

function CategoryHeadPane() {
  const {
    // reloadFlagMemo,
    // categoriesMemo,
    categorySelectedMemo: { 
      // categorySelected, 
      setCategorySelected 
    },
    currentAction: { 
      // categoryAction, 
      setCategoryAction 
    },
  } = useContext(CategoryContext);

  const onCategoryAdd = () => {
    setCategorySelected({});
    setCategoryAction("add");
  };

  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <CategoryIcon style={{ fontSize: 40 }} />
          </IconButton>

          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Categorías
          </Typography>

          <Tooltip title="Crear categoría" arrow>
            <IconButton color="inherit" onClick={onCategoryAdd}>
              <Icon style={{ fontSize: 40 }}>add_circle</Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default CategoryHeadPane;
