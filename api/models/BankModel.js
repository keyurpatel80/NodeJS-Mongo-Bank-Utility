
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BankSchema = new Schema({
  first_name: {type: String},
  last_name: {type: String},
  accounts: { type: [{
    account_type: String,
    account_balance: Number,
    currency:  String,
     _id: false 
   }]},
  city: {type: String},
  SSN: {type: String}
}, {collection: 'bank_data'},{ strict: false });

BankSchema.plugin(require('mongoose-paginate'))

module.exports = mongoose.model('Bank_data', BankSchema);
