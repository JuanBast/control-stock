const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    dni: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String
    },
    telephone: {
        type: Number,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
}, {
    timestamps: true
});

module.exports = model('User', userSchema);