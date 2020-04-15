const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
    rolename: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = model('Role', roleSchema);