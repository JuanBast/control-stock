const { Schema, model } = require('mongoose');

const salemasterSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    salesdetails: [{
        type: Schema.Types.ObjectId,
        ref: 'Saledetail'
    }]
}, {
    timestamps: true
})

module.exports = model('Salemaster', salemasterSchema);