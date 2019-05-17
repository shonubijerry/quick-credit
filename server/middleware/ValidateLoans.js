import errorStrings from '../helpers/errorStrings';
import Validator from '../helpers/Validator';
import rules from '../helpers/rules';
import responseHelper from '../helpers/responseHelper';


/**
 *    @fileOverview Class to validate loans form submission
 *    @class ValidateLoans
 *    @requires ../helpers/errorStrings
 *    @requires ../helpers/Validator
 *    @requires ../helpers/rules
 *    @requires ../helpers/responseHelper
 *    @exports ValidateLoans
 */

class ValidateLoans {
  /**
   * validate signup input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   */

  static validateApplication(req, res, next) {
    const errors = {};
    const { amount, tenor } = req.body;

    Object.assign(errors, Validator.validate(
      tenor, rules.empty, rules.validTenor, errorStrings.validTenor,
    ));
    Object.assign(errors, Validator.validate(
      amount, rules.empty, rules.validAmount, errorStrings.validAmount,
    ));

    if (Validator.findErrors(errors)) {
      return responseHelper.error(res, 422, errors.errorKey);
    }
    return next();
  }

  /**
   * validate id parameter to be a number from request.params.loanId
   * @param {Object} req request object
   * @param {Object} res response object
   * @callback {Function} next
   * @return {Object} error json object
   */

  static validateApproveLoan(req, res, next) {
    const error = {};

    Object.assign(error, Validator.validate(
      req.params.loanId, rules.empty, rules.validNumber, errorStrings.validNumber,
    ));
    Object.assign(error, Validator.validate(
      req.body.status, rules.empty, rules.validApproveLoan, errorStrings.validApproveLoan,
    ));

    if (Validator.findErrors(error)) {
      return responseHelper.error(res, 400, error.errorKey);
    }
    return next();
  }

  /**
   * validate amount from request.body.amount
   * @param {Object} req request object
   * @param {Object} res response object
   * @callback {Function} next
   * @return {Object} error json object
   */

  static validateRepayment(req, res, next) {
    const error = {};
    const { amount } = req.body;
    const getError = Validator.validate(
      amount, rules.empty, rules.validAmount, errorStrings.validAmount,
    );
    Object.assign(error, getError);

    if (Validator.findErrors(error)) {
      return responseHelper.error(res, 400, error.errorKey);
    }
    return next();
  }
}

export default ValidateLoans;
