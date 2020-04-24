import React, { useState, useMemo, useEffect } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import RoleContext from "./RoleContext";
import RolePage from "./RolePage";
import RoleController from "./RoleController";

const Roles = () => {
  const [reloadFlag, setReloadFlag] = useState(1);
  const reloadFlagMemo = useMemo(() => ({ reloadFlag, setReloadFlag }), [
    reloadFlag,
    setReloadFlag,
  ]);

  const [roles, setRoles] = useState();
  const rolesMemo = useMemo(() => ({ roles, setRoles }), [roles, setRoles]);

  useEffect(() => {
    async function getRoles() {
      const result = await RoleController.getAllRoles();
      setRoles(result.data);
    }
    getRoles();
  }, [reloadFlag]);

  const [roleSelected, setRoleSelected] = useState();
  const roleSelectedMemo = useMemo(() => ({ roleSelected, setRoleSelected }), [
    roleSelected,
    setRoleSelected,
  ]);

  const [roleAction, setRoleAction] = useState();
  const roleActionMemo = useMemo(() => ({ roleAction, setRoleAction }), [
    roleAction,
    setRoleAction,
  ]);

  const initialValue = {
    reloadFlagMemo,
    rolesMemo,
    roleSelectedMemo,
    roleActionMemo,
  };

  return (
    <RoleContext.Provider value={initialValue}>
      {typeof roles !== "undefined" ? <RolePage /> : <CircularProgress />}
    </RoleContext.Provider>
  );
};

export default Roles;
