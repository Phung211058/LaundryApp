const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String},
    phone: {type: String},
    city: {type: String},
    district: {type: String},
    commune: {type: String},
    detairAddress: {type: String},
    OrderDate: {type: Date},
    createdAt: {type: Date, default: Date.now},
})

const OrderModel = mongoose.model('Orders',  OrderSchema);
module.exports = OrderModel;