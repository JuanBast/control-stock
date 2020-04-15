const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
},{
    timestamps: true
})

module.exports = model('Product', productSchema);