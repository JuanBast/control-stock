const { Schema, model } = require('mongoose');

const saledetailSchema = new Schema({
    salemaster: {
        type: Schema.Types.ObjectId,
        ref: 'Salemaster',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Saledetail', saledetailSchema);