const { Schema, model } = require('mongoose');

const supplierSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    cuit: {
        type: Number,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String
    },
    telephone: {
        type: Number,
    }
}, {
    timestamps: true
});

module.exports = model('Supplier', supplierSchema);