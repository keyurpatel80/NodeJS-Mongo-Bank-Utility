var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Bank_data = require('./api/models/BankModel'), //created model loading here
  bodyParser = require('body-parser');
 
var paginate = require('express-paginate');
app.use(paginate.middleware(10, 50));
 
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test/bank_data')
 .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/BankRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
