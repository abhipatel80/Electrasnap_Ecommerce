const ordermodel = require('../models/orderModel');
const productmodel = require('../models/productModel');
const sendemail = require('../utils/sendemail');

const newOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, itemsPrice, totalPrice, shippingPrice } = req.body;
        const { name, phoneNo, pincode, state, country, city, address } = shippingInfo;

        let validationError = null;
        if (!name || !phoneNo || !pincode || !state || !country || !city || !address) {
            validationError = "Please Enter all data";
        } else if (phoneNo.toString().length !== 10) {
            validationError = "Please Enter valid mobile number";
        } else if (pincode.toString().length !== 6) {
            validationError = "Please Enter valid pincode";
        };

        if (validationError) {
            res.status(400).json(validationError);
        } else {
            const neworder = new ordermodel({
                shippingInfo, orderItems, itemsPrice, totalPrice, shippingPrice, user: req.user._id,
                orderedAt: new Date(),
            });

            let deliveredDate = new Date(neworder.orderedAt);
            deliveredDate.setDate(deliveredDate.getDate() + 6);
            neworder.deliveredAt = deliveredDate;

            await neworder.save();

            const msg = `Dear, ${name} \n\n Your Order is Placed Successfully, we are try to deliver your Product as soon as possible. \n\n productName: ${orderItems.name} \n\n productQuantity : ${orderItems.quantity || 1} \n\n Total: ${orderItems.price} \n\n Thank you for shopping😊.`

            await sendemail({
                email: req.user.email,
                subject: `Order Placed Successfully`,
                message: msg
            });

            const product = await productmodel.findById(neworder.orderItems.product);
            product.stock -= neworder.orderItems.quantity;
            await product.save();
            res.status(201).json("Order placed successfully");
        };
    } catch (e) {
        res.status(400).json(e);
    };
};

const getsingleorder = async (req, res) => {
    try {
        const order = await ordermodel.findById(req.params.id).populate("user", "name email");
        if (!order) {
            return res.status(400).json("Order Not Found");
        };
        res.status(200).json(order);
    } catch (e) {
        res.status(401).json(e);
    }
};

const myorders = async (req, res) => {
    try {
        const orders = await ordermodel.find({ user: req.user._id });
        res.status(200).json(orders);
    } catch (e) {
        res.status(401).json(e);
    }
};

const getallorders = async (req, res) => {
    try {
        const orders = await ordermodel.find();

        let totalamt = 0;
        orders.forEach((order) => {
            return totalamt += order.totalPrice;
        });

        res.status(200).json({ totalamt, orders });
    } catch (e) {
        res.status(401).json(e);
    }
};

const updateorderstatus = async (req, res) => {
    try {
        const order = await ordermodel.findById(req.params.id);
        if (!order) {
            return res.status(400).json("Order Not Found");
        };

        if (order.orderStatus === "Delivered") {
            return res.status(400).json("You have already delivered this Order");
        };

        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity);
        });

        order.orderStatus = req.body.status;
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        };

        await order.save();
        res.status(200).json({ order });
    } catch (e) {
        res.status(401).json(e);
    }
};

async function updateStock(id, quantity) {
    const product = await productmodel.findById(id);
    product.stock -= quantity;
    await product.save();
};

const cancelorder = async (req, res) => {
    try {
        const order = await ordermodel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        const product = await productmodel.findById(order.orderItems.product);
        product.stock += order.orderItems.quantity;
        await product.save();

        await order.save();
        res.status(201).json("Order Cancelled");

    } catch (e) {
        res.status(401).json(e);
    }
};

module.exports = {
    newOrder,
    getsingleorder,
    myorders,
    getallorders,
    updateorderstatus,
    cancelorder,
};
