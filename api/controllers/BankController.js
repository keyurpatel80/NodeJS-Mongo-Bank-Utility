'use strict';
var mongoose = require('mongoose'),
BankTask = mongoose.model('Bank_data');


exports.list_all_data = function(req, res) {
  BankTask.find({}, function(err, accounts) {
    res.json(accounts);
    });
};


exports.create_a_account = function(req, res) {
  var new_account = new BankTask(req.body);
  new_account.save(function(err, account) {
    if (err)
      res.send(err);
    res.json(account);
  });
};




