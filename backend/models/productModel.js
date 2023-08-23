const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    seller: {
        type: String,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: [true, "Please Enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter product price"],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter product category"],
    },
    company: {
        type: String,
        required: [true, "Please Enter product company"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter product stock"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const productmodel = new mongoose.model('Product', productSchema);
module.exports = productmodel
