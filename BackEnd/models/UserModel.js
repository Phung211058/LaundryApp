const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    AccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String},
    phone: { type: String },
    address: {
        city: { type: String },
        district: { type: String },
        borough: { type: String },
        detailAddress: { type: String },
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

