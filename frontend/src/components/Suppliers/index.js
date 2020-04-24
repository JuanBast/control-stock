import React, { useState, useEffect, useMemo } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import SupplierPage from "./SupplierPage";
import SupplierContext from "./SupplierContext";
import SupplierController from "./SupplierController"

const Suppliers = () => {
  const [reloadFlag, setReloadFlag] = useState(1);
  const reloadFlagMemo = useMemo(() => ({ reloadFlag, setReloadFlag }), [
    reloadFlag,
    setReloadFlag,
  ]);

  const [suppliers, setSuppliers] = useState();
  const suppliersMemo = useMemo(() => ({ suppliers, setSuppliers }), [
    suppliers,
    setSuppliers,
  ]);

  useEffect(() => {
    async function getSuppliers() {
      const result = await SupplierController.getAllSuppliers();
      setSuppliers(result.data);
    }
    getSuppliers();
  }, [reloadFlag]);

  const [supplierSelected, setSupplierSelected] = useState();
  const supplierSelectedMemo = useMemo(
    () => ({ supplierSelected, setSupplierSelected }),
    [supplierSelected, setSupplierSelected]
  );

  const [supplierAction, setSupplierAction] = useState();
  const currentAction = useMemo(() => ({ supplierAction, setSupplierAction }), [
    supplierAction,
    setSupplierAction,
  ]);

  const initialValue = {
    reloadFlagMemo,
    suppliersMemo,
    supplierSelectedMemo,
    currentAction,
  };

  return (
    <SupplierContext.Provider value={initialValue}>
      {typeof suppliers !== "undefined" ? <SupplierPage /> : <CircularProgress />}
    </SupplierContext.Provider>
  );
};

export default Suppliers;
