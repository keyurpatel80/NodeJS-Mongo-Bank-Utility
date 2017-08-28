'use strict';
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var paginate = require('express-paginate');

var BankTask = mongoose.model('Bank_data');


exports.list_all_data = function(req, res, next) {
  var param = {};
  if (req.query.first_name) {
    BankTask.paginate({first_name: req.query.first_name},{ page: req.query.page, limit: req.query.limit }, function(err, accounts) {
    res.json({
          pageCount: accounts.pages,
          itemCount: accounts.limit,
          has_more: paginate.hasNextPages(req)(accounts.pages),
          data: accounts
        }
        );
    });
  }
  else{
   BankTask.paginate({},{ page: req.query.page, limit: req.query.limit }, function(err, accounts) {
    res.json({
          pageCount: accounts.pages,
          itemCount: accounts.limit,
          has_more: paginate.hasNextPages(req)(accounts.pages),
          data: accounts
        }
        );
    })
  }
};


exports.list_by_account_id = function(req, res) {
    BankTask.find({_id: new ObjectId(req.params.id)}, function(err, accounts) {
    res.json(accounts);
    });
};

exports.list_id_by_accounts = function(req, res) {
   console.log(req.query.currency);
   if (req.query.currency){
      BankTask.aggregate({$match:{_id: new ObjectId(req.params.id)}}, {$unwind: "$accounts"}, {$match: {"accounts.currency": req.query.currency}}, function(err, accounts) {
      res.json(accounts);
      });
   }
   else{
     BankTask.findOne({_id: new ObjectId(req.params.id)}, function(err, accounts) {
      res.json(accounts.accounts);
      });
   }
  };

exports.create_a_account = function(req, res) {
  var new_account = new BankTask(req.body);
  new_account.save(function(err, account) {
    if (err)
      res.send(err);
    res.json(account);
  });
};




