import React from "react";

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

function CategoryHeadPane() {
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
            <IconButton color="inherit" /*onClick={onUserAdd}*/>
              <Icon style={{ fontSize: 40 }}>add_circle</Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default CategoryHeadPane;
