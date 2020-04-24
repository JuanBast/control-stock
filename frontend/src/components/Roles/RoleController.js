import axios from "axios";

const HOST = "http://localhost:4000"
const rest = "/api/v1/role/"
const URL = HOST + rest

const RoleCRUD = {}

RoleCRUD.createRole = async (newRole) => {
    return await axios.post(URL, newRole);
}

RoleCRUD.updateRole = async (id, role) => {
    return await axios.put(URL + id, role);
}

RoleCRUD.deleteRole = async (id) => {
    return await axios.delete(URL + id);
}

RoleCRUD.getAllRoles = async () => {
    return await axios.get(URL);
}

export default RoleCRUD;