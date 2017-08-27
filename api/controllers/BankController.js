'use strict';
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var paginate = require('express-paginate');

var BankTask = mongoose.model('Bank_data');


exports.list_all_data = function(req, res, next) {
  BankTask.paginate({},{ page: req.query.page, limit: req.query.limit }, function(err, accounts) {
    res.json({
          has_more: paginate.hasNextPages(req)(accounts.pages),
          data: accounts
        }
        );
    });
};


exports.list_by_account_id = function(req, res) {
  BankTask.find({_id: new ObjectId(req.params.id)}, function(err, accounts) {
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




