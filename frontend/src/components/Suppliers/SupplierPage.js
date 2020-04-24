import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

import SupplierContext from "./SupplierContext";
import SupplierForm from "./SupplierForm";
import SupplierHeadPane from "./SupplierHeadPane";
import SupplierTable from "./SupplierTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "10px",
    },
  },
}));

export default function SupplierPage() {
  const classes = useStyles();

  const {
    currentAction: { supplierAction },
  } = useContext(SupplierContext);

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div style={{ flexGrow: 1 }}>
          <SupplierHeadPane />
          {
            supplierAction === undefined
            ? <SupplierTable /> 
            : <SupplierForm />
          }
        </div>
      </Paper>
    </div>
  );
}
