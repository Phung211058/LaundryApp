const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    AccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    city: {
        type: String
    },
    district: {
        type: String
    },
    commune: {
        type: String
    },
    detailAddress: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;