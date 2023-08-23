const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
    },
    role: {
        type: String,
        default: "user"
    },
    resetpasswordToken: String,
    resetpasswordExpired: Date,
});

userSchema.methods.getJwtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY);
};

userSchema.methods.getResetPasswordToken = function () {
    const resetoken = crypto.randomBytes(20).toString("hex");
    this.resetpasswordToken = crypto.createHash("sha256").update(resetoken).digest("hex");
    this.resetpasswordExpired = Date.now() + 15 * 60 * 1000;
    return resetoken;
};

const usermodel = new mongoose.model('user', userSchema);
module.exports = usermodel;
