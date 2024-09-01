const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true},
  password: { type: String, required: true },
});

const AccountModel = mongoose.model('Accounts', AccountSchema);
module.exports = AccountModel;
