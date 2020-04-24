import React, { useState, useEffect, useMemo } from "react";

import CategoryPage from "./CategoryPage";
import CategoryContext from "./CategoryContext";
import CategoryController from "./CategoryController"

const Categories = () => {
  const [reloadFlag, setReloadFlag] = useState(1);
  const reloadFlagMemo = useMemo(() => ({ reloadFlag, setReloadFlag }), [
    reloadFlag,
    setReloadFlag,
  ]);

  const [categories, setCategories] = useState();
  const categoriesMemo = useMemo(() => ({ categories, setCategories }), [
    categories,
    setCategories,
  ]);

  useEffect(() => {
    async function getCategories() {
      const result = await CategoryController.getAllCategories();
      setCategories(result.data);
    }
    getCategories();
  }, [reloadFlag]);

  const [categorySelected, setCategorySelected] = useState();
  const categorySelectedMemo = useMemo(() => ({ categorySelected, setCategorySelected }), [
    categorySelected,
    setCategorySelected,
  ]);

  const [categoryAction, setCategoryAction] = useState();
  const currentAction = useMemo(() => ({ categoryAction, setCategoryAction }), [
    categoryAction,
    setCategoryAction,
  ]);

  const initialValue = {
    reloadFlagMemo,
    categoriesMemo,
    categorySelectedMemo,
    currentAction
  };

  return (
    <CategoryContext.Provider value={initialValue}>
      {typeof categories !== "undefined" 
        ? <CategoryPage />
        : null
      }
    </CategoryContext.Provider>
  );
};

export default Categories;
