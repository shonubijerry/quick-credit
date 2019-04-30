import errorStrings from '../helpers/errorStrings';
import Validator from '../helpers/Validator';
import rules from '../helpers/rules';


/**
 *    @fileOverview Class to validate user login and signup forms submission
 *    @class ValidateUser
 *    @requires ../helpers/errorStrings
 *    @requires ../helpers/Validator
 *    @requires ../helpers/rules
 *    @exports ValidateUser
 */

class ValidateUser {
  /**
   * validate signup input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next 
   * @return {String} errors
   */

  static validateSignup(request, response, next) {
    const {
      firstName,
      lastName,
      email,
      password,
      address
    } = request.body;
    const errors = {};

    if (!firstName || !rules.empty.test(firstName) || !lastName || !rules.empty.test(lastName))
      errors.nameRequired = errorStrings.nameRequired;
    
    if (!rules.validName.test(firstName) || !rules.validName.test(lastName))
       errors.validName = errorStrings.validName;        

    if (!email || !rules.empty.test(email) || !rules.validEmail.test(email))
       errors.validEmail = errorStrings.validEmail;

    if (!address || !rules.empty.test(address) || !rules.validAddress.test(address))
       errors.validAddress = errorStrings.validAddress;

    if (!password || !rules.empty.test(password)) errors.passwordEmpty = errorStrings.passwordEmpty;

    if (!rules.passwordLength.test(password)) errors.passwordLength = errorStrings.passwordLength;

    Validator.checkValidationErrors(response, errors, next);
  }
  
}

export default ValidateUser;
