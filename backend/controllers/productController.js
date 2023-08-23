const productmodel = require('../models/productModel');
 
const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        let product = await productmodel.find().skip((page - 1) * limit).limit(limit);

        if (req.query.name) {
            const searchproduct = await productmodel.find({ name: { $regex: req.query.name, $options: "i" } }).skip((page - 1) * limit).limit(limit);
            res.status(201).json(searchproduct);
        } else if (req.query.category) {
            let cateProduct = product.filter((val) => val.category === req.query.category);
            res.status(201).json(cateProduct);
        } else if (req.query.ratings) {
            const filterProduct = await productmodel.find({ ratings: { $gte: 4 } }).skip((page - 1) * limit).limit(limit);
            res.status(201).json(filterProduct);
        } else {
            res.status(201).json(product);
        };
    } catch (e) {
        res.status(401).json(e);
    }
};

const addProduct = async (req, res) => {
    try {
        req.body.seller = req.user.name
        const product = await productmodel.create(req.body);
        res.status(201).json({ product });
    } catch (e) {
        res.status(401).json(e);
    }
};

const editProduct = async (req, res) => {
    try {
        let product = await productmodel.findById(req.params.id);
        if (!product) {
            return res.status(400).json("Product Not Found");
        }
        product = await productmodel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(200).json({ product })
    } catch (e) {
        res.status(401).json(e);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await productmodel.findById(req.params.id);
        if (!product) {
            return res.status(400).json("Product Not Found");
        }
        await productmodel.findByIdAndDelete(req.params.id);
        res.status(200).json("Product Deleted Successfully");
    } catch (e) {
        res.status(401).json(e);
    }
};

const getProductDetails = async (req, res) => {
    try {
        const product = await productmodel.findById(req.params.id);
        if (!product) {
            return res.status(400).json("Product Not Found");
        }
        res.status(201).send(product)
    } catch (e) {
        res.status(401).json(e);
    }
};

const createproductreview = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        };
        const product = await productmodel.findById(productId);

        const isReviewed = product.reviews.find(val => val.user.toString() === req.user._id.toString());
        if (!rating || !comment || !productId) {
            res.status(401).json("Please Enter all data");
        } else if (isReviewed) {
            product.reviews.forEach((val) => {
                if (val.user.toString() === req.user._id.toString()) {
                    val.rating = rating
                    val.comment = comment
                };
            });
            await product.save({ validateBeforeSave: false });
            res.status(201).json("You rated this product successfully");
        } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length

            let avg = 0;
            product.reviews.forEach((val) => {
                avg += val.rating;
            });

            product.ratings = avg / product.reviews.length;
            await product.save({ validateBeforeSave: false });
            res.status(201).json("You rated this product successfully");
        };
    } catch (e) {
        res.status(401).json(e);
    }
};

const deletereviews = async (req, res) => {
    try {
        const product = await productmodel.findById(req.query.productid);
        if (!product) {
            return res.status(404).json("Product not found");
        };

        const reviews = product.reviews.filter((val) => {
            return val._id.toString() !== req.query.id.toString();
        });

        let avg = 0;
        reviews.forEach((val) => {
            avg += val.rating;
        });

        const ratings = avg / reviews.length;
        const numOfReviews = reviews.length;

        await productmodel.findByIdAndUpdate(req.query.productid, { reviews, ratings, numOfReviews }, { new: true, runValidators: true, useFindAndModify: false });

        res.status(201).json("You are deleted this product review successfully")
    } catch (e) {
        res.status(401).json(e);
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductDetails,
    deletereviews,
    deleteProduct,
    editProduct,
    createproductreview,
}
