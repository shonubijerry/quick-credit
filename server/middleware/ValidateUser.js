import errorStrings from '../helpers/errorStrings';
import Validator from '../helpers/Validator';
import rules from '../helpers/rules';
import responseHelper from '../helpers/responseHelper';
import UsersModel from '../model/usersModel';

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
   * validate signup input form data
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */

  static validateSignupFormData(request, response, next) {
    const signupErrors = ValidateUser.checkNamesAndAddressErrors(request.body);
    const signinErrors = ValidateUser.checkEmailAndPasswordErrors(request.body);

    const errors = signupErrors.concat(signinErrors);

    const error = Validator.findErrors(errors);

    if (error.length > 0) {
      return responseHelper.error(response, 400, error);
    }
    return next();
  }

  /**
   * collect all possible errors from firstname, lastname and address inputs
   * @param {Object} request
   * @return {String} errors
   */

  static checkNamesAndAddressErrors({
    firstName, lastName, password, address,
  }) {
    const errors = [];

    const firstNameError = Validator.validate(
      firstName, rules.empty, rules.validName, errorStrings.validFirstName,
    );
    errors.push(firstNameError);

    const lastnameError = Validator.validate(
      lastName, rules.empty, rules.validName, errorStrings.validLastName,
    );
    errors.push(lastnameError);

    const addressError = Validator.validate(
      address, rules.empty, rules.validAddress, errorStrings.validAddress,
    );
    errors.push(addressError);

    if (!rules.passwordLength.test(password)) {
      const passwordError = errorStrings.passwordLength;
      errors.push(passwordError);
    }

    return errors;
  }

  /**
   * validate email and password
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */

  static validateSigninFormData(request, response, next) {
    const signinErrors = ValidateUser.checkEmailAndPasswordErrors(request.body);

    const error = Validator.findErrors(signinErrors);

    if (error.length > 0) {
      return responseHelper.error(response, 400, error);
    }
    return next();
  }

  /**
   * collect all possible errors from email and password inputs
   * @param {Object} request
   * @return {String} errors
   */

  static checkEmailAndPasswordErrors({ email, password }) {
    const errors = [];

    const emailError = Validator.validate(
      email, rules.empty, rules.validEmail, errorStrings.validEmail,
    );
    errors.push(emailError);

    if (!password || !rules.empty.test(password)) {
      const passwordEmptyError = errorStrings.passwordEmpty;
      errors.push(passwordEmptyError);
    }
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
    const error = [];

    const emailError = Validator.validate(
      request.params.email, rules.empty, rules.validEmail, errorStrings.validVerifyEmail,
    );
    error.push(emailError);

    if (Validator.findErrors(error).length > 0) {
      return responseHelper.error(response, 400, error[0]);
    }
    return next();
  }

  /**
   * validate email parameter from request.params.email
   * @param {Object} req request object
   * @param {Object} res response object
   * @callback {Function} next
   * @return {Object} error json object
   */

  static validateUsersEndpointQuery(request, response, next) {
    const filter = Object.keys(request.query);
    if (filter.length > 0) {
      if (filter.indexOf('status') === -1) {
        return responseHelper.error(response, 404, errorStrings.pageNotFound);
      }
      const val = Object.values(request.query);
      if (val.indexOf('verified') !== -1 || val.indexOf('unverified') !== -1) {
        return next();
      }
      const error = errorStrings.validUserStatus;
      return responseHelper.error(response, 400, error);
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
    try {
      const user = await usersModel.findUserById(req.user.id);
      if (user.status !== 'verified') {
        return responseHelper.error(res, 401, errorStrings.notVerified);
      }
    } catch (error) {
      return responseHelper.error(res, 500, errorStrings.serverError);
    }
    return next();
  }
}

export default ValidateUser;
