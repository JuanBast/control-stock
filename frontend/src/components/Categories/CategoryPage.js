import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

import { CategoryContext } from "./CategoryContext";
import CategoryForm from "./CategoryForm";
// import { getRandomColor } from "../../utils";
import CategoryHeadPane from "./CategoryHeadPane";
import CategoryTable from "./CategoryTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "10px",
    },
  },
}));

export default function CategoryPage() {
  const classes = useStyles();

  const {
    currentAction: { categoryAction },
  } = useContext(CategoryContext);

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div style={{ flexGrow: 1 }}>
          <CategoryHeadPane />
          {
            categoryAction === undefined
            ? <CategoryTable /> 
            : <CategoryForm />
          }
        </div>
      </Paper>
    </div>
  );
}
