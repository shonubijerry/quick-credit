/**
 *   @fileOverview - errors strings
 *   @exports errorStrings
 * */

const errorStrings = {
  pageNotFound: 'Page not found. Please enter a valid url',
  validName: 'Name must be letters only and not less than 2.',
  validEmail: 'Enter a valid email address',
  emailExists: 'Email address has already been registered',
  validAddress: 'Enter a valid Address',
  passwordEmpty: 'Your password is required',
  passwordLength: 'Password must be minimum eight characters, with at least one letter, one number and one special character ',
  loginFailure: 'Could not login. Email and password do not match',
  emailNotExist: 'User does not exist',
  notAuthenticated: 'You must login to have access to this feature',
  sessionExpired: 'Session expired, login again',
  validTenor: 'Tenor must range from 1 to 12 months',
  validAmount: 'Amount must be positive number(s)',
  noRepayments: 'There are currently no repayments for this loan',
  noUsers: 'There are currently no registered users',
  noUser: 'User does not exist',
  notAllowed: 'You are forbidden from accessing this section of the app',
  alreadyVerified: 'User has already been verified',
  alreadyApproved: 'No update: Action already performed ',
  noLoans: 'You currently do not have any loan to display',
  noLoan: 'Loan not found',
  deleteSuccess: 'Item deleted successfully',
  deleteError: 'Item not deleted',
  validNumber: 'Enter a valid loan id',
  noApproveLoan: 'Loan not approved',
  validApproveLoan: 'Loan status parameter should be either approved or rejected',
  notAmount: 'You are expected to pay',
  loanRepaid: 'This loan has already been repaid',
  notApproved: 'You cannot post repayment for a pending or rejected loan',
};

export default errorStrings;
