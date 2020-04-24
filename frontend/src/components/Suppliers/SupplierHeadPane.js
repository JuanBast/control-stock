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

import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import SupplierContext from "./SupplierContext";

function SupplierHeadPane() {
  const {
    currentAction: { 
      // supplierAction, 
      setSupplierAction 
    },
    supplierSelectedMemo: { 
      // supplierSelected, 
      setSupplierSelected 
    },
  } = useContext(SupplierContext);

  const handleAdd = () => {
    setSupplierSelected({});
    setSupplierAction("add");
  };

  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <AssignmentIndIcon style={{ fontSize: 40 }} />
          </IconButton>

          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Proveedores
          </Typography>

          <Tooltip title="Crear proveedor" arrow>
            <IconButton color="inherit" onClick={handleAdd}>
              <Icon style={{ fontSize: 40 }}>add_circle</Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default SupplierHeadPane;
