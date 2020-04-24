import axios from "axios";

const HOST = "http://localhost:4000";
const rest = "/api/v1/category/";
const URL = HOST + rest;

const CategoryController = {};

CategoryController.createCategory = async (newCategory) => {
  return await axios.post(URL, newCategory);
};

CategoryController.updateCategory = async (id, category) => {
  return await axios.put(URL + id, category);
};

CategoryController.deleteCategory = async (id) => {
  return await axios.delete(URL + id);
};

CategoryController.getAllCategories = async () => {
  return await axios.get(URL);
};

export default CategoryController;
