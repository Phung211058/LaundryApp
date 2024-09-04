const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String },
    phone: { type: String },
    city: { type: String },
    district: { type: String },
    commune: { type: String },
    detailAddress: { type: String }, 
    selectedType: { type: String },
    selectedCategory: { type: String }, 
    selectedWeight: { type: String }, 
    selectedFlavour: { type: String },
    selectedTime: { type: String }, 
    totalPrice: { type: Number }, 
    orderDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
})       

const OrderModel = mongoose.model('Orders',  OrderSchema);
module.exports = OrderModel;