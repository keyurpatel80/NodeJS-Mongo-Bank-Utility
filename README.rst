
This small project is developed to demonstrate the how API is developed using ExpressJS and MongoDB. I have used MongoDB version 3.2.7 and Expressjs 5.3.0. To connect to MongoDB I have used Mongoose object modeling for Express.

This repository contains sources of API for Create, update, delete and Read bank accounts from bank_Data.json file which is MongoDB collection. You can find bank_data.json file /db folder which can you install it in your local machine.

## What's in it?

#Here is the list of APIs supported:

- GET /api/customers - List all the customers in the bank.

- GET /api/customers/:id - list specific customer by id.

- GET /api/customers/:id/accounts - list all the accounts of specific customer.

- GET /api/customers/avg_balance - list average balance of each customer.

- GET /api/accounts/sorted - list all the accounts in sorted balance order.

- POST /api/customers - Create new customer.

- POST /api/customers/:id/accounts - Create new account for specific customer.

- DELETE /api/customers/:id - delete specific customer.

- PUT /api/customers - Update customers to add new fields.


#Feel free to raise issues or add new features. 

#You can reach me at keyurpatel80@gmail.com for any questions.
