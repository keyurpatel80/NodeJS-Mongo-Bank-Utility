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

exports.update_customers = function(req, res) {
       console.log(req.body);
       BankTask.updateMany({}, {$set: {"SSN":"XXX"}}, {multi: true}, function(err, accounts){
           if (err) {
              console.log("Error");
           }
           else{
           res.json(accounts);
           }
       });
      };

exports.delete_customer = function(req, res) {
       console.log(req.params.id);
       BankTask.remove({"_id" : new ObjectId(req.params.id)}, function(err, accounts){
           if (err) { 
              console.log("Error");
           }
           else{
           res.json(accounts);
           }
         });
       };


exports.list_by_account_id = function(req, res) {
       BankTask.find({_id: new ObjectId(req.params.id)}, function(err, accounts) {
       res.json(accounts);
       });
};


exports.list_id_by_accounts = function(req, res) {
   console.log(req.query.currency);
   if (req.query.currency){
      BankTask.aggregate({$match:{_id: new ObjectId(req.params.id)}}, {$unwind: "$accounts"}, {$match: {"accounts.currency": req.query.currency}} , function(err, accounts) {
      res.json(accounts);
      });
   }
   else{
     BankTask.findOne({_id: new ObjectId(req.params.id)}, function(err, accounts) {
      res.json(accounts.accounts);
      });
   }
  };


exports.add_account = function(req, res) {
    BankTask.update({_id:ObjectId(req.params.id)},{ "$push": {"accounts": req.body}}, {upsert: false}, function(err, accounts){
      if (accounts.ok === 1 && accounts.nModified === 1) {
         res.json("Account added");
      }
      else{
         res.json("Error");
      }
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


exports.list_sorted_accounts = function(req, res) {
  if (req.query.limit) {
         BankTask.aggregate({$unwind: "$accounts"},{$group: {_id:"$_id", "accountbalance":{ $sum: "$accounts.account_balance"}}},  {$sort: {accountbalance: -1}},{ $limit : req.query.limit }, function(err,accounts){
        res.json(accounts);
    });
  }
  else {
        BankTask.aggregate({$unwind: "$accounts"},{$group: {_id:"$_id", "accountbalance":{ $sum: "$accounts.account_balance"}}},  {$sort: {accountbalance: -1}}, function(err,accounts){
        res.json(accounts);
    });
  }
};
 

exports.list_avg_balance = function(req, res) { 
     if (req.query.limit) {
         BankTask.aggregate({$unwind: "$accounts"},{$group: {_id:"$_id", "accountbalance":{ $sum: "$accounts.account_balance"}}},{$sort:{"accountbalance":-1}}, { $limit : req.query.limit }, function(err, accounts) {
         res.json(accounts);
       });
     }
     else{
       BankTask.aggregate({$unwind: "$accounts"},{$group: {_id:"$_id", "accountbalance":{ $sum: "$accounts.account_balance"}}},{$sort:{"accountbalance":-1}}, function(err, accounts) {
         res.json(accounts);
      });
     }
  };
  
