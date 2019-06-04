# Quick-Credit

[![Build Status](https://travis-ci.com/shonubijerry/quick-credit.svg?branch=develop)](https://travis-ci.com/shonubijerry/quick-credit)
[![Test Coverage](https://api.codeclimate.com/v1/badges/40263d408451dc9d9b99/test_coverage)](https://codeclimate.com/github/shonubijerry/quick-credit/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/40263d408451dc9d9b99/maintainability)](https://codeclimate.com/github/shonubijerry/quick-credit/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/shonubijerry/quick-credit/badge.svg?branch=develop)](https://coveralls.io/github/shonubijerry/quick-credit?branch=develop)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

## UI hosted on gh pages
https://shonubijerry.github.io/quick-credit/UI/

## Working frontend hosted on gh pages
https://shonubijerry.github.io/quick-credit-frontend/

## Pivotal Tracker Project
https://www.pivotaltracker.com/n/projects/2326551

## Server side hosted on Heroku
https://quick-credit-shonubi.herokuapp.com/

## API Documentation

https://quick-credit-shonubi.herokuapp.com/api-docs

https://quickcredit6.docs.apiary.io/

## Table of Content
 * [Getting Started](#getting-started)

 * [Prerequisites for installation](#Prerequisites)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [ API End Points Test Using Postman](#api-end-points)

 * [Coding Style](#coding-style)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
 * [Author](#author)

 * [License](#lincense)

 * [Acknowledgement](#acknowledgement)

## Getting Started

### Prerequisites for installation
1. Node js
2. Express
3. Git

### Installation
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/shonubijerry/quick-credit
```
2. Install dependencies 
```
e.g npm install.
```
3. Start the application by running the start script.
```
e.g npm start
```
4. Install postman to test all endpoints on port 3000.

### Run Test

```
e.g npm test
```

### API End Points Test Using Postman

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/auth/signup</td>  <td>User signup</td></tr>

<tr><td>POST</td> <td>/api/v1/auth/login</td>  <td>User signin</td></tr>

<tr><td>POST</td> <td>/api/v1/loans</td>  <td>Post a loan</td></tr>

<tr><td>POST</td> <td>/api/v1/loans/:loanId/repayment</td>  <td>Posts a loan repayment</td></tr>

<tr><td>PATCH</td> <td>/api/v1/users/:email/verify</td>  <td>Verify a user</td></tr>

<tr><td>PATCH</td> <td>/api/v1/loans/:loanId</td>  <td>Approve/Reject a loan repayment</td></tr>

<tr><td>GET</td> <td>/api/v1/loans</td>  <td>Get loans</td></tr>

<tr><td>GET</td> <td>/api/v1/loans/:loanId</td>  <td>Get a loan by loanId</td></tr>

<tr><td>GET</td> <td>/api/v1/loans?status=approved&repaid=false</td>  <td>Get all current loans</td></tr>

<tr><td>GET</td> <td>/api/v1/loans?status=approved&repaid=true</td>  <td>Get all repaid loans</td></tr>

<tr><td>GET</td> <td>/api/v1/loans/:loanId/repayments</td>  <td>Gets repayments for a loan</td></tr>

<tr><td>GET</td> <td>/api/v1/users</td>  <td>Gets all users</td></tr>
 
</table>


### Coding Style
* Airbnb style guide. 

## Features

 ### Users
* A user can sign up
* A user can login
* A user can request for loan
* A user can view loan repayment history

 ### Admin
* Admin can mark a client as verified
* Admin can view a specific loan application
* Admin can approve or reject a client’s loan application
* Admin can post loan repayment transaction in favour of a client
* Admin can view all loan applications
* Admin can view all current loans (not fully repaid)
* Admin can view all repaid loans
* Admin can view all users
 

## Built With
* NodeJs-EXPRESS: Node.js is a javascript runtime built on Chrome's V8 javascript engine.

* html5: It is used for structuring the frontend.

* css: It is used for styling the frontend.


## Author
* Shonubi Oluwakorede

## License
This project is licensed under The MIT License (MIT) - see the LICENSE.md file for details.

## Acknowledgement
* Andela

