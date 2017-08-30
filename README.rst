

# CRUD API in ExpressJS and MongoDB

This repository contains sources of API for Create, update, delete and Read bank accounts from bank_Data.json file which is MongoDB collection.

I have used ExpressJS for creating APIs.

## What's in it?

Here is the list of APIs supported:
- GET /api/customers - List all the customers in the bank.

- GET /api/customers/:id - list specific customer by id.

- GET /api/customers/:id/accounts - list all the accounts of specific customer.

- GET /api/customers/avg_balance - list average balance of each customer.

- GET /api/accounts/sorted - list all the accounts in sorted balance order.

- POST /api/customers - Create new customer.

- POST /api/customers/:id/accounts - Create new account for specific customer.

- DELETE /api/customers/:id - delete specific customer.

- PUT /api/customers - Update customers to add new fields.


## How to create new account?

- POST /accounts  

