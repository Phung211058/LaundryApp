const AccountModel = require('../models/AccountModel');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
    const {
        phoneNumber,
        password
    } = req.body;
    // kiểm tra phone number tồn tại chưa
    console.log(req.body);
    try {
        const existingPhone = await AccountModel.findOne({
            phoneNumber
        });
        if (existingPhone) {
            return res.status(400).json({
                message: 'Phone number already registered'
            })
        };
        // Mã hóa mật khẩu 
        const hashedPassword = await bcrypt.hash(password, 10); // Số lần salt (băm) là 10
        // Tạo tài khoản mới
        const account = new AccountModel({
            phoneNumber: phoneNumber,
            password: hashedPassword,
        });
        await account.save();
        const user = new UserModel({
            AccountId: account._id
        })
        await user.save();
        res.status(200).json({
            message: 'Registration successful'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Registration failed'
        });
        console.log(error);
    }
};
// Login User
exports.loginUser = async (req, res) => {
    const {
        phoneNumber,
        password
    } = req.body;
    try {
        const account = await AccountModel.findOne({
            phoneNumber
        });
        if (!account) return res.status(404).json({
            error: 'User not found'
        });
        const isMatch = await compare(password, account.password);
        if (!isMatch) return res.status(400).json({
            error: 'Invalid credentials'
        });
        // const token = jwt.sign({
        //     id: account._id
        // }, 'your_jwt_secret', {
        //     expiresIn: '1h'
        // });
        // res.json({
        //     token,
        //     account
        // });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
// Create user
exports.createUser = async (req, res) => {
    try {
        const {
            name,
            phone,
            address
        } = req.body;
        const user = new User({
            name,
            phone,
            address
        });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
};
// get user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({
            err: "user not found"
        });
        res.status(200).json({
            user
        });
    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
};
// update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id);
        if (!user) return res.status(404).json({
            err: 'User not found'
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({
            err: "User not found"
        });
        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
}