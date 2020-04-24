import React, { useState, useEffect, useMemo } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import UserPage from "./UserPage";
import UserContext from "./UserContext";
import UserController from "./UserController";
import RoleController from "../Roles/RoleController";

const Users = () => {
  const [reloadFlag, setReloadFlag] = useState(1);
  const reloadFlagMemo = useMemo(() => ({ reloadFlag, setReloadFlag }), [
    reloadFlag,
    setReloadFlag,
  ]);

  const [users, setUsers] = useState([]);
  const usersMemo = useMemo(() => ({ users, setUsers }), [users, setUsers]);
  useEffect(() => {
    async function getUsers() {
      const result = await UserController.getAllUsers();
      setUsers(result.data);
    }
    getUsers();
  }, [reloadFlag]);

  const [roles, setRoles] = useState([]);
  const rolesMemo = useMemo(() => ({ roles, setRoles }), [roles, setRoles]);
  useEffect(() => {
    async function getRoles() {
      const result = await RoleController.getAllRoles();
      setRoles(result.data);
    }
    getRoles();
  }, []);

  const [userSelected, setUserSelected] = useState();
  const userSelectedMemo = useMemo(() => ({ userSelected, setUserSelected }), [
    userSelected,
    setUserSelected,
  ]);

  const [userAction, setUserAction] = useState();
  const userActionMemo = useMemo(() => ({ userAction, setUserAction }), [
    userAction,
    setUserAction,
  ]);

  const intialValue = {
    reloadFlagMemo,
    usersMemo,
    rolesMemo,
    userSelectedMemo,
    userActionMemo,
  };

  return (
    <UserContext.Provider value={intialValue}>
      {
        typeof users !== undefined
          ? <UserPage />
          : <CircularProgress />
      }
    </UserContext.Provider>
  );
};

export default Users;
