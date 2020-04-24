import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

import UserContext from "./UserContext";
import UserHeadPane from "./UserHeadPane";
import UserTable from "./UserTable";
import UserForm from "./UserForm";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "10px",
    },
  },
}));

export default function UserPage() {
  const classes = useStyles();

  const {
    userActionMemo: { userAction },
  } = useContext(UserContext);

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div style={{ flexGrow: 1 }}>
          <UserHeadPane />
          {userAction === undefined ? <UserTable /> : <UserForm />}
        </div>
      </Paper>
    </div>
  );
}
