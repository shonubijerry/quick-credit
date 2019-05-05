/**
*   @fileOverview - errors strings
*   @exports errorStrings
* */

const errorStrings = {
  validName: 'Enter a valid name that is not less than 2 letters.',
  validEmail: 'Enter a valid email address',
  emailExists: 'Email address has already been registered',
  validAddress: 'Enter a valid Address',
  passwordEmpty: 'Your password is required',
  passwordLength: 'Password must not be less than 6 characters',
  loginFailure: 'Could not login. Email and password do not match',
  emailNotExist: 'User does not exist',
  notAuthenticated: 'You must login to have access to this feature',
  validTenor: 'Tenor must range from 1 to 12 months',
  validAmount: 'Amount must be digits',
  noRepayments: 'There are currently no repayments for this loan',
  noUsers: 'There are currently no registered users',
  noUser: 'User does not exist',
  notAllowed: 'You are forbidden from accessing this section of the app',
  alreadyVerified: 'User has already been verified',

};

export default errorStrings;
