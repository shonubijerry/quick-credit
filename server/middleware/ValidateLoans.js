import errorStrings from '../helpers/errorStrings';
import Validator from '../helpers/Validator';
import rules from '../helpers/rules';


/**
 *    @fileOverview Class to validate loans form submission
 *    @class ValidateLoans
 *    @requires ../helpers/errorStrings
 *    @requires ../helpers/Validator
 *    @requires ../helpers/rules
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

    Validator.findErrors(res, errors, next);
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

    Validator.findErrors(res, error, next);
  }
}

export default ValidateLoans;
