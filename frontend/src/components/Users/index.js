import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import UserPage from "./UserPage";

import { UserContext } from "./UserContext";

const Users = () => {
  // Set re-render flag
  const [renderFlag, setRenderFlag] = useState(1);
  const currentRenderFlag = useMemo(() => ({ renderFlag, setRenderFlag }), [
    renderFlag,
    setRenderFlag,
  ]);

  // Get All Users and set them on state
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const result = await axios("http://localhost:4000/api/v1/user");
      setUsers(result.data);
    }
    fetchUsers();
    // eslint-disable-next-line
  }, [renderFlag]);
  const usersData = useMemo(() => ({ users, setUsers }), [users, setUsers]);

  // Get all Roles and set them on state
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    async function fetchRoles() {
      const result = await axios.get("http://localhost:4000/api/v1/role");
      setRoles(result.data);
    }
    fetchRoles();
    // eslint-disable-next-line
  }, []);
  const rolesData = useMemo(() => ({ roles, setRoles }), [roles, setRoles]);

  // Initialize Dialog to false, to not show
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const userDialog = useMemo(() => ({ userDialogOpen, setUserDialogOpen }), [
    userDialogOpen,
    setUserDialogOpen,
  ]);

  // State handler for user selected
  const [userSelected, setUserSelected] = useState();
  const currentUser = useMemo(() => ({ userSelected, setUserSelected }), [
    userSelected,
    setUserSelected,
  ]);

  // Set current action selected on state
  const [userAction, setUserAction] = useState();
  const currentAction = useMemo(() => ({ userAction, setUserAction }), [
    userAction,
    setUserAction,
  ]);

  // Config the state initial value
  const intialValue = {
    usersData,
    rolesData,
    userDialog,
    currentUser,
    currentAction,
    currentRenderFlag,
  };

  return (
    <UserContext.Provider value={intialValue}>
      <UserPage />
    </UserContext.Provider>
  );
};

export default Users;
