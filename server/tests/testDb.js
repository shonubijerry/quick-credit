/**
 * @fileOverview - This module holds test data
 * @exports - object
 */

const users = [
  {
    // sign up test data
    email: 'shonubijerry@yahoo.com', // valid registration details
    firstName: 'Shonubi',
    lastName: 'Oluwakorede',
    password: 'olujac1$',
    address: '33, Ahmed Oghere Street, Idimu',
  },
  {
    // array item 1
    email: 'adenekan@gmail.info',
    firstName: 'John',
    lastName: '#Quad%ri*', // invalid name
    password: 'olujac1$',
    address: '6, Felix Street, Ikotun',
  },
  {
    // array item 2
    email: 'adenekagmail.info', // invalid email
    firstName: 'Baba',
    lastName: 'Quadri',
    password: 'olujac1$',
    address: '6, Felix Street, Ikotun',
  },
  {
    // array item 3
    email: 'shonubijerry@gmail.com', // email already exist
    firstName: 'Baba',
    lastName: 'Quadri',
    password: 'olujac1$',
    address: '6, Felix Street, Ikotun',
  },
  {
    // array item 4
    email: 'shonubijerry@ymail.com',
    firstName: 'Baba',
    lastName: 'Quadri',
    password: 'olujac1$',
    address: '6', // invalid address
  },
  {
    // array item 5
    email: 'shonubi@ymail.com',
    firstName: 'Baba',
    lastName: 'Quadri',
    password: 'adann', // password length short
    address: '6, Felix Street, Ikotun',
  },
  {
    // array item 6
    email: 'shonubi@ymail.com',
    firstName: 'Baba',
    lastName: 'Quadri',
    password: '', // empty password
    address: '6, Felix Street, Ikotun',
  },

  // sign in test data
  {
    // array item 7
    email: 'shonubijerry@gmail.com', // valid login details
    password: 'olujac1$',
  },
  {
    // array item 8
    email: 'shonubijerrygmail.com', // invalid login email
    password: 'olujac1$',
  },
  {
    // array item 9
    email: 'shonubijerry@gmail.com',
    password: '', // empty login password
  },
  {
    // array item 10
    email: 'korede.hot@yahoo.com', // user does not exist
    password: 'olujac',
  },
  {
    // array item 11
    email: 'shonubijerry@gmail.com',
    password: 'olujac1', // incorrect login password
  },
  {
    // array item 12
    email: 'badmanga@yahoo.com', // test user with no loan application
    password: 'olujac1$',
  },
  {
    // array item 13
    email: 'adeade@gmail.com', // user with current loan and status approved
    password: 'olujac1$',
  },
  {
    // array item 14
    email: 'adenekan@gmail.info',
    firstName: '', // empty name
    lastName: 'Quadri',
    password: 'olujac1$',
    address: '6, Felix Street, Ikotun',
  },

];

const loanApplication = [
  {
    amount: 60000, // correct loan application
    tenor: 7,
  },
  {
    amount: '60000a', // invalid loan amount
    tenor: 7,
  },
  {
    amount: 60000,
    tenor: 14, //  invalid loan tenor
  },
];

const approveRejectLoan = [
  {
    status: 'approved', // approve the loan application
  },
  {
    status: 'pending', // reject the loan application
  },
  {
    status: 'iAmInvalid', // incorrect query citerea
  },
  {
    status: 'rejected', // reject the loan application
  },
];

const repaymentAmount = [
  {
    amount: 11760.00, // valid amount for post repayment
    tenor: 1,
  },
  {
    amount: 12000.00, // amount posted is not what is expected to pay
    tenor: 1,
  },
  {
    amount: '17,000.00', // invalid amount because of comma
    tenor: 1,
  },
  {
    amount: 81600.00, // loan is rejected or pending approval
    tenor: 1,
  },
  {
    amount: 8400.00, // loan is repaid
    tenor: 1,
  },
  {
    money: 12000.00, // invalid post parameter - money
    tenor: 1,
  },
  {
    amount: 9000.00, // loan is rejected or pending approval
    tenor: 1,
  },
  {
    amount: 12000.00, // amount paid is more than balance
    tenor: 9,
  },
  {
    amount: 12000.00,
    tenor: 99, // tenor is invalid
  },
  {
    amount: 12000.00,
    month: 4, // tenor does not exist
  },
];

export default {
  users, loanApplication, approveRejectLoan, repaymentAmount,
};
