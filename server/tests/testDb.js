/**
 * @fileOverview - This module holds test data
 * @exports - object
 */

const users = [
  {
    // sign up test data
    email: 'shonubijerry@gmail.cam', // valid registration details
    firstName: 'Shonubi',
    lastName: 'Oluwakorede',
    password: 'olujac',
    address: '33, Ahmed Oghere Street, Idimu',
  },
  {
    email: 'adenekan@gmail.info',
    firstName: '', // no name
    lastName: '#Quad%ri*', // invalid name
    password: 'adenekan123',
    address: '6, Felix Street, Ikotun',
  },
  {
    email: 'adenekagmail.info', // invalid email
    firstName: 'Baba',
    lastName: 'Quadri',
    password: 'adenekan123',
    address: '6, Felix Street, Ikotun',
  },
  {
    email: 'shonubijerry@gmail.com', // email already exist
    firstName: 'Baba',
    lastName: 'Quadri',
    password: 'adenekan123',
    address: '6, Felix Street, Ikotun',
  },
  {
    email: 'shonubijerry@ymail.com',
    firstName: 'Baba',
    lastName: 'Quadri',
    password: 'adenee',
    address: '6', // invalid address
  },
  {
    email: 'shonubi@ymail.com',
    firstName: 'Baba',
    lastName: 'Quadri',
    password: 'adann', // password length short
    address: '6, Felix Street, Ikotun',
  },
  {
    email: 'shonubi@ymail.com',
    firstName: 'Baba',
    lastName: 'Quadri',
    password: '', // empty password
    address: '6, Felix Street, Ikotun',
  },

  // sign in test data
  {
    email: 'shonubijerry@gmail.com', // valid login details
    password: 'olujac',
  },
  {
    email: 'shonubijerrygmail.com', // invalid login email
    password: 'olujac',
  },
  {
    email: 'shonubijerrygmail.com',
    password: '', // empty login password
  },
  {
    email: 'korede.hot@yahoo.com', // user does not exist
    password: 'olujac',
  },
  {
    email: 'shonubijerry@gmail.com',
    password: 'olujac1', // incorrect login password
  },
  {
    email: 'badmanga@yahoo.com', // test user with no loan application
    password: 'gbenga123',
  },
  {
    email: 'adeade@gmail.com', // user with current loan and status approved
    password: 'ade123',
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
    amount: '11760.00', // valid amount for post repayment
  },
  {
    amount: '12000.00', // amount posted is not what is expected to pay
  },
  {
    amount: '17,000.00', // invalid amount because of comma
  },
  {
    amount: '81600.00', // loan is rejected or pending approval
  },
  {
    amount: '8400.00', // loan is repaid
  },
  {
    money: '12000.00', // invalid post parameter - money
  },
];

export default {
  users, loanApplication, approveRejectLoan, repaymentAmount,
};
