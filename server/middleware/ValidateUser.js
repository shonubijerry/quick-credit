import errorStrings from '../helpers/errorStrings';
import Validator from '../helpers/Validator';
import rules from '../helpers/rules';
import responseHelper from '../helpers/responseHelper';
import UsersModel from '../model/usersModel';
import Auth from './Auth';

const usersModel = new UsersModel('users');


/**
 *    @fileOverview Class to validate user login and signup forms submission
 *    @class ValidateUser
 *    @requires ../helpers/errorStrings
 *    @requires ../helpers/Validator
 *    @requires ../helpers/rules
 *    @requires ../helpers/responseHelper
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

    if (Validator.findErrors(errors)) {
      return responseHelper.error(response, 400, errors.errorKey);
    }
    return next();
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

    if (Validator.findErrors(signinErrors)) {
      return responseHelper.error(response, 400, signinErrors.errorKey);
    }
    return next();
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
   * @param {Object} req request object
   * @param {Object} res response object
   * @callback {Function} next
   * @return {Object} error json object
   */

  static validateParamEmail(request, response, next) {
    const error = {};

    Object.assign(error, Validator.validate(
      request.params.email, rules.empty, rules.validEmail, errorStrings.validEmail,
    ));

    if (Validator.findErrors(error)) {
      return responseHelper.error(response, 400, error.errorKey);
    }
    return next();
  }

  /**
  * Check user is verified so as to allow perform actions
  * @param {object} req
  * @param {object} res
  * @returns json object
  */

  static async checkVerified(req, res, next) {
    req.token = Auth.verifyToken(req.headers.token);
    try {
      const user = await usersModel.findUserByEmail(req.token.user.email);
      if (user.status !== 'verified') {
        return responseHelper.error(res, 401, errorStrings.notVerified);
      }
    } catch (error) {
      return responseHelper.error(res, 500, error.message);
    }
    return next();
  }
}

export default ValidateUser;
