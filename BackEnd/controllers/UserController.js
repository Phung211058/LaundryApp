const AccountModel = require('../models/AccountModel');
const OrderModel = require('../models/OrderModel');
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
    console.log(req.body)
    try {
        const account = await AccountModel.findOne({
            phoneNumber
        });
        if (!account) return res.status(404).json({
            message: 'User not found'
        });
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) return res.status(400).json({
            message: 'Invalid credentials'
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
        res.status(200).json({
            message: 'Login successful',
            accountId: account._id,
        });
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
exports.getUserByAccountId = async (req, res) => {
    const accountId = req.params.accountId;
    console.log(accountId);
    try {
        const user = await UserModel.findOne({
            AccountId: accountId
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            message: error.message
        });
    };
};
// update user
exports.updateUserByAccountId = async (req, res) => {
    const accountId = req.params.accountId;
    const {
        name,
        phone,
        city,
        district,
        commune,
        detailAddress
    } = req.body;
    try {
        const user = await UserModel.findOneAndUpdate({
                AccountId: accountId
            }, {
                name,
                phone,
                city,
                district,
                commune,
                detailAddress
            }, {
                new: true
            } // Trả về tài liệu đã cập nhật
        );
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json(user);
        console.log(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.createOrder = async (req, res) => {
    // const accountId = req.params.accountId;
    // if (!mongoose.Types.ObjectId.isValid(accountId)) {
    //     return res.status(400).json({
    //         message: 'Invalid accountId format',
    //     });
    // }
    const {
        accountId,
        name,
        phone,
        city,
        district,
        commune,
        detailAddress,
        selectedType,
        selectedCategory,
        selectedWeight,
        selectedFlavour,
        selectedTime,
        totalPrice,
        orderDate
    } = req.body;
    console.log(req.body);
    try {
        const order = new OrderModel({
            accountId: accountId,
            name: name,
            phone: phone,
            city: city,
            district: district,
            commune: commune,
            detailAddress: detailAddress,
            selectedType: selectedType,
            selectedCategory: selectedCategory,
            selectedWeight: selectedWeight,
            selectedFlavour: selectedFlavour,
            selectedTime: selectedTime,
            totalPrice: totalPrice,
            orderDate: orderDate,
        });
        await order.save();
        res.status(200).json({
            message: 'Order created successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating order',
            error: error.message
        });
    }
};