'use strict';
module.exports = function(app) {
  var bank_data_list = require('../controllers/BankController');

  // bank_data_list Routes
  app.route('/customers/')
    .get(bank_data_list.list_all_data)
    .post(bank_data_list.create_a_account)
    .put(bank_data_list.update_customers); 

  app.route('/customers/:id')
     .get(bank_data_list.list_by_account_id)
     .delete(bank_data_list.delete_customer)

  app.route('/accounts/avg_balance')
     .get(bank_data_list.list_avg_balance);

  app.route('/customers/:id/:accounts')
     .get(bank_data_list.list_id_by_accounts)
     .post(bank_data_list.add_account);


  app.route('/accounts/sorted/')
     .get(bank_data_list.list_sorted_accounts);


  //app.route('/accounts/:accountId')
 //   .get(bank_data_list.read_a_account)
 //   .put(bank_data_list.update_a_account)
 //   .delete(bank_data_list.delete_a_account);
};
