import axios from "axios";

const HOST = "http://localhost:4000";
const rest = "/api/v1/supplier/";
const URL = HOST + rest;

const SupplierController = {};

SupplierController.createSupplier = async (newSupplier) => {
  return await axios.post(URL, newSupplier);
};

SupplierController.updateSupplier = async (id, supplier) => {
  return await axios.put(URL + id, supplier);
};

SupplierController.deleteSupplier = async (id) => {
  return await axios.delete(URL + id);
};

SupplierController.getAllSuppliers = async () => {
  return await axios.get(URL);
};

export default SupplierController;
