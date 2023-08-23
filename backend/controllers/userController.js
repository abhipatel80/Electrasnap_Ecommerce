const usermodel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const sendemail = require('../utils/sendemail');
const crypto = require('crypto');
const validator = require('validator');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const bcrpass = await bcrypt.hash(password, 10);
        const user = await usermodel.findOne({ email });
        const isEmail = await validator.isEmail(email);

        if (!name || !email || !password || !role) {
            res.status(400).send("Please Enter all data")
        } else if (!isEmail) {
            res.status(400).send("Please enter valid email")
        } else if (user) {
            res.status(400).send("User with this Email already exists")
        } else if (role !== "user" && role !== "seller") {
            res.status(401).send("Please enter role either user or seller only")
        } else {
            const user = await usermodel.create({
                name, email, role,
                password: bcrpass,
            });

            const token = user.getJwtoken();
            res.status(201).json({ success: token, user })
        };
    } catch (e) {
        res.status(401).json(e);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json("Please Enter Email and Password")
        } else {
            const user = await usermodel.findOne({ email });
            const checkpass = await bcrypt.compare(password, user.password);

            if (!user) {
                res.status(400).json("Email or password are incorrect")
            } else if (!checkpass) {
                res.status(400).json("Email or password are incorrect")
            } else {
                const token = user.getJwtoken();
                res.status(200).json({ success: token, user })
            };
        }
    } catch (e) {
        res.status(402).send(e.message);
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({ success: "Logged out" })
    } catch (e) {
        res.status(401).json(e);
    }
};

const forgetpassword = async (req, res) => {
    try {
        const user = await usermodel.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json("User not found with this email");
        } else {
            const resetoken = user.getResetPasswordToken();
            await user.save({ validateBeforeSave: false });

            // const resetpassurl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetoken}`;
            const resetpassurl = `http://localhost:3000/password/reset/${resetoken}`;

            const msg = `Your password reset link is here :- \n\n ${resetpassurl} \n\nIf you have not requested this email then, please ignore it.`;
            try {
                await sendemail({
                    email: user.email,
                    subject: `Ecommerce Password Recovery`,
                    message: msg
                });
                res.status(201).json(`Email sent to ${user.email} successfully`);
            } catch (e) {
                user.resetpasswordToken = undefined;
                user.resetpasswordExpired = undefined;
                await user.save({ validateBeforeSave: false });
                return res.status(401).json(e);
            }
        }
    } catch (e) {
        res.status(401).json(e);
    }
};

const resetpassword = async (req, res) => {
    try {
        const bcrpass = await bcrypt.hash(req.body.password, 10);
        const resetpasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await usermodel.findOne({ resetpasswordToken, resetpasswordExpired: { $gt: Date.now() } });

        if (!user) {
            res.status(400).json("Reset Password token invalid or has been expired")
        } else if (req.body.password !== req.body.confirmpassword) {
            res.status(400).json("Password doesn't match")
        } else {
            user.password = bcrpass;
            user.resetpasswordToken = undefined;
            user.resetpasswordExpired = undefined;

            await user.save();

            const token = user.getJwtoken();
            res.status(200).json({ success: token, user })
        }
    } catch (e) {
        res.status(401).json(e);
    }
};

const getuserdetails = async (req, res) => {
    try {
        const user = await usermodel.findById(req.user.id);
        res.status(201).json({ success: user })
    } catch (e) {
        res.status(401).json(e);
    }
};

const updatepassword = async (req, res) => {
    try {
        const bcrpass = await bcrypt.hash(req.body.newpassword, 10);
        const user = await usermodel.findById(req.user._id);

        const match = await bcrypt.compare(req.body.oldpassword, user.password);

        if (!req.body.oldpassword || !req.body.newpassword || !req.body.confirmpassword) {
            res.status(400).json("Please fill all data");
        } else if (!match) {
            res.status(400).json("Old password is incorrect");
        } else if (req.body.newpassword !== req.body.confirmpassword) {
            res.status(400).json("New password and confirm password doesn't match");
        } else {
            user.password = bcrpass;
            await user.save();

            const token = user.getJwtoken();
            res.status(200).json({ success: token, msg: "Password Changed Successfully" });
        };
    } catch (e) {
        res.status(401).json(e);
    }
};

const updateprofile = async (req, res) => {
    try {
        const user = await usermodel.findByIdAndUpdate(
            { _id: req.user._id },
            { $set: req.body },
            { new: true },
        );
        res.status(200).json(user);
    } catch (e) {
        res.status(401).json(e);
    }
};

const getallusers = async (req, res) => {
    try {
        const user = await usermodel.find();
        res.status(200).json({ user });
    } catch (e) {
        res.status(401).json(e);
    }
};

const getalluserdetails = async (req, res) => {
    try {
        const user = await usermodel.findById(req.user.id);
        res.status(200).json({ user });
    } catch (e) {
        res.status(401).json(e);
    }
};

const adminupdateprofile = async (req, res) => {
    try {
        const newuser = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        };

        const user = await usermodel.findByIdAndUpdate(req.params.id, newuser, { new: true, runValidators: true });
        res.status(200).json({ success: user });
    } catch (e) {
        res.status(401).json(e);
    }
};

const admindeleteuser = async (req, res) => {
    try {
        const user = await usermodel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({ error: `User does not exist with id: ${req.params.id}` })
        }
        res.status(200).json({ success: "User Deleted Successfully" })
    } catch (e) {
        res.status(401).json(e);
    }
};

module.exports = {
    register,
    login,
    logout,
    forgetpassword,
    resetpassword,
    getuserdetails,
    updatepassword,
    updateprofile,
    getallusers,
    getalluserdetails,
    adminupdateprofile,
    admindeleteuser
}

