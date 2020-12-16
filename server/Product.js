var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    id: {
        type: Number
    },
    product: {
        productid: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        category: {
            type: String,
            ref: 'User'
        },
        price: {
            type: Number,
            default: 0,
            min: 0
        },
        name: {
            type: String,
            default: "product",
        },
        instock: {
            type: Boolean,
            default: true
        }
    }
});

module.exports = mongoose.model('Product', productSchema);