/**
*   @fileOverview - errors strings
*   @exports errorStrings
**/

const errorStrings = {
    nameRequired: 'First name and Lastname field is required',
    validName: 'Names can only contain letters and must not be less than 2 characters.',
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
    
}

export default errorStrings;