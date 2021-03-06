# Banka

## Introduction
Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. It support's a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money. 

[![Build Status](https://travis-ci.org/swisskid95/Banka.svg?branch=Develop)](https://travis-ci.org/swisskid95/Banka)
[![Coverage Status](https://coveralls.io/repos/github/swisskid95/Banka/badge.svg?branch=Develop)](https://coveralls.io/github/swisskid95/Banka?branch=Develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a174a1d36fd6b86ef813/maintainability)](https://codeclimate.com/github/swisskid95/Banka/maintainability)

## Banka app

The front end of the app is hosted on gh-pages [here](https://swisskid95.github.io/Banka/ui)

The documentation can be found [here](https://swisskid-banka.herokuapp.com/api-docs)

The version 1 of this apps api is hosted on heroku and you can access it using this [link](https://swisskid-banka.herokuapp.com/api/v1)

## Features

- User(client) can sign up 
- User(client) can sign in
- User admin can create a staff user account
- User(client) can create new account
- User(staff/cashier) can debit client
- User(staff/cashier) can credit client
- User(staff/admin) can switch a bank accounts status to either dormant and active
- User(staff/admin) can delete a bank account
- User can get all bank accounts
- User can get all transactions on a particular account
- User can get a specific transaction with its id
- Work Still In Progress

## Dependencies

To use this app you would need the following installed on your machine:
- Nodejs
- more would be added as other features are added

## Tools used

***
### Tools

> Frontend (UI)
> - HTML and CSS for weblayout and styling
> - Javascript for dynamic behaviour

> Backend (api)
> - Node js for server-side logic
> - Express for http logic
> - Babel for transpiling code to support wide range of browsers
> - Swagger(open api) for documentation

> Test Driven Development (TDD)
> - Mocha and chai-assertion-library for testing
> - Chai-http for request simulations

> Continuous Integration
> - Travis CI for continuous integration
> - Codeclimate for code quality report
> - Coveralls for test coverage report

***

Work still in progress, would update progressively
