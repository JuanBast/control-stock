import axios from "axios";

const HOST = "http://localhost:4000"
const rest = "/api/v1/user/"
const URL = HOST + rest

const UserController = {};

UserController.createUser = async (newUser) => {
    return await axios.post(URL, newUser);
}

UserController.updateUser = async (id, user) => {
    return await axios.put(URL + id, user);
}

UserController.deleteUser = async (id) => {
    return await axios.delete(URL + id);
}

UserController.getAllUsers = async () => {
    return await axios.get(URL);
}

export default UserController;