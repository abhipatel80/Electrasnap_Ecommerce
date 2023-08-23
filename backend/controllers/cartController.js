const cartmodel = require('../models/cartModel');

const addcart = async (req, res) => {
    try {
        req.body.user = req.user.name;
        req.body.userID = req.user._id;

        const cartData = await cartmodel.findOne({
            $and: [
                { userID: req.body.userID },
                { product: req.body.product },
            ],
        });

        if (cartData) {
            res.status(400).send("Product already exist in cart");
        } else {
            const cart = await cartmodel.create(req.body);
            res.status(201).send(cart);
        }
    } catch (e) {
        res.status(201).send(e);
    }
};

const getcart = async (req, res) => {
    try {
        const cart = await cartmodel.find().populate("product", "name price seller images category stock");
        let filtercart = cart.filter((val) => {
            return val.userID == req.user.id;
        });
        res.status(201).send(filtercart);
    } catch (e) {
        res.status(201).send(e);
    }
};

const deletecart = async (req, res) => {
    try {
        await cartmodel.findByIdAndDelete(req.params.id);
        res.status(201).send("Product removed successfully")
    } catch (e) {
        res.status(201).send(e);
    }
};

const editcart = async (req, res) => {
    try {
        const cartItem = await cartmodel.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true },
        );
        await cartItem.save();
        res.status(201).json(cartItem)
    } catch (e) {
        res.status(201).send(e);
    };
};

module.exports = {
    addcart,
    getcart,
    deletecart,
    editcart
}
