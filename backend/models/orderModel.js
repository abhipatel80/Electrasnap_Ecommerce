const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: Number, required: true },
        phoneNo: { type: Number, required: true },
    },
    orderItems: {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
        image: { type: String, required: true },
        product: { type: mongoose.Schema.ObjectId, required: true, ref: "Product" },
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    itemsPrice: {
        type: Number,
        default: 0,
        required: true
    },
    shippingPrice: {
        type: Number,
        default: 0,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: Date,
    createdAt: { type: Date, default: Date.now },
});

const ordermodel = new mongoose.model('Order', orderSchema);

module.exports = ordermodel;
