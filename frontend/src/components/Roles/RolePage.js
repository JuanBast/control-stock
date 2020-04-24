import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

import RoleHeadPane from './RoleHeadPane'
import RoleTable from "./RoleTable";
import RoleForm from "./RoleForm";
import RoleContext from "./RoleContext" 

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "10px",
    }
  },
  div: {
    flexGrow: 1,
  }
}));

export default function RolePage() {
  const classes = useStyles();

  const {
    roleActionMemo: { 
      roleAction, 
      // setRoleAction 
    },
  } = useContext(RoleContext);



  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div className={classes.div}>
          <RoleHeadPane />
          {
            roleAction === undefined
              ? <RoleTable />
              : <RoleForm />
          }
        </div>
      </Paper>
    </div>
  )
}
