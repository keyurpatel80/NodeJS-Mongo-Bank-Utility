'use strict';
module.exports = function(app) {
  var bank_data_list = require('../controllers/BankController');

  // bank_data_list Routes
  app.route('/customers/')
    .get(bank_data_list.list_all_data)
    .post(bank_data_list.create_a_account);

  app.route('/customers/:id')
     .get(bank_data_list.list_by_account_id);

  app.route('/customers/:id/:accounts')
     .get(bank_data_list.list_id_by_accounts);

  //app.route('/accounts/:accountId')
 //   .get(bank_data_list.read_a_account)
 //   .put(bank_data_list.update_a_account)
 //   .delete(bank_data_list.delete_a_account);
};
