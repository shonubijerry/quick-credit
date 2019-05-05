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
   * @return {Object} error
   */

  static validateSignup(request, response, next) {
    const signupErrors = ValidateUser.checkSignupErrors(request.body);
    const signinErrors = ValidateUser.checkSigninErrors(request.body);

    const errors = Object.assign(signupErrors, signinErrors);

    Validator.findErrors(response, errors, next);
  }

  /**
   * collect all possible errors
   * @param {Object} request
   * @return {String} errors
   */

  static checkSignupErrors({
    firstName, lastName, password, address,
  }) {
    const errors = {};

    Object.assign(errors, Validator.validate(
      firstName, rules.empty, rules.validName, errorStrings.validName,
    ));
    Object.assign(errors, Validator.validate(
      lastName, rules.empty, rules.validName, errorStrings.validName,
    ));
    Object.assign(errors, Validator.validate(
      address, rules.empty, rules.validAddress, errorStrings.validAddress,
    ));

    if (!rules.passwordLength.test(password)) errors.errorKey = errorStrings.passwordLength;

    return errors;
  }

  /**
   * validate signin input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */

  static validateSignin(request, response, next) {
    const signinErrors = ValidateUser.checkSigninErrors(request.body);

    Validator.findErrors(response, signinErrors, next);
  }

  /**
   * collect possible singin errors
   * @param {Object} request
   * @return {String} errors
   */

  static checkSigninErrors({ email, password }) {
    const errors = {};

    Object.assign(errors, Validator.validate(
      email, rules.empty, rules.validEmail, errorStrings.validEmail,
    ));

    if (!password || !rules.empty.test(password)) { errors.errorKey = errorStrings.passwordEmpty; }

    return errors;
  }

  /**
   * validate email parameter from request.params.email
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */

  static validateParamEmail(req, res, next) {
    const error = {};

    Object.assign(error, Validator.validate(
      req.params.email, rules.empty, rules.validEmail, errorStrings.validEmail,
    ));

    Validator.findErrors(res, error, next);
  }
}

export default ValidateUser;
