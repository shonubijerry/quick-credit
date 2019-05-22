/**
 *   @fileOverview - errors strings
 *   @exports errorStrings
 * */

const errorStrings = {
  serverError: 'Something went wrong',
  pageNotFound: 'Page not found. Please enter a valid url',
  validFirstName: 'Firstname field cannot be empty and must be only letters',
  validLastName: 'Lastname field cannot be empty and must be only letters.',
  validEmail: 'Enter valid email with top level domain and must not be empty',
  validVerifyEmail: 'Enter valid email address',
  emailExists: 'Email address has already been registered',
  validAddress: 'Address field must be valid and not empty',
  passwordEmpty: 'Your password is required',
  passwordLength: 'Password must be minimum eight characters, with at least one letter, one number and one special character ',
  loginFailure: 'Could not login. Email and password do not match',
  notAuthenticated: 'You must login to have access to this feature',
  sessionExpired: 'Session expired, login again',
  validTenor: 'Tenor must range from 1 to 12 months',
  validAmount: 'Amount must be positive number',
  noRepayments: 'There are currently no repayments for this loan',
  noUsers: 'There are currently no registered users',
  noUser: 'User does not exist',
  notAllowed: 'You are forbidden from accessing this section of the app',
  alreadyVerified: 'User has already been verified',
  alreadyApproved: 'No update: Loan already',
  noLoans: 'You currently do not have any loan to display',
  noLoan: 'Loan not found',
  deleteSuccess: 'Item deleted successfully',
  deleteError: 'Item not deleted',
  validLoanId: 'Enter a valid loan id',
  noApproveLoan: 'Loan not approved',
  validApproveLoan: 'Loan status parameter should be either approved or rejected',
  notAmount: 'You are expected to pay',
  loanRepaid: 'This loan has already been repaid',
  notApproved: 'You cannot post repayment for a pending or rejected loan',
  notVerified: 'User account not verified',
};

export default errorStrings;
