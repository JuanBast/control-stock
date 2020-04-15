const usersCtrl = {};
const User = require('../models/User');
const Role = require('../models/Role');

usersCtrl.createUser = async (req, res) => {
    const { name, surname, dni, email, address, telephone, username, password, role } = req.body;
    const newUser = new User({
        name, 
        surname, 
        dni, 
        email, 
        address, 
        telephone, 
        username, 
        password,
        role
    });
    await newUser.save();
    res.json({ messsage: 'User created!'});
}

usersCtrl.deleteUser = async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.json({ messsage: 'User deleted!'});
}

usersCtrl.updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, surname, dni, email, address, telephone, username, password, role } = req.body;

    await User.findByIdAndUpdate(id, {
        name, 
        surname, 
        dni, 
        email, 
        address, 
        telephone, 
        username, 
        password, 
        role
    });
    res.json({ messsage: 'User updated!'});
}

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find().populate('role', 'rolename -_id');
    res.json(users);
}

usersCtrl.getOneUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).populate('role', 'rolename -_id');
    res.json(user);
}

module.exports = usersCtrl;