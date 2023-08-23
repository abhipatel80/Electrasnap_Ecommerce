const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
    },
    user: {
        type: String,
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    quantity: { type: Number, default: 1 },
});

const cartmodel = mongoose.model('cart', cartSchema);

module.exports = cartmodel;
