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
    const errors = [];
    const { amount, tenor } = req.body;

    const tenorError = Validator.validate(
      tenor, rules.empty, rules.validTenor, errorStrings.validTenor,
    );
    errors.push(tenorError);

    const amountError = Validator.validate(
      amount, rules.empty, rules.validAmount, errorStrings.validAmount,
    );
    errors.push(amountError);

    const error = Validator.findErrors(errors);

    if (error.length > 0) {
      return responseHelper.error(res, 422, error);
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
    const errors = [];

    const loanIdError = Validator.validate(
      req.params.loanId, rules.empty, rules.validUuid, errorStrings.validLoanId,
    );
    errors.push(loanIdError);

    const approvalError = Validator.validate(
      req.body.status, rules.empty, rules.validApproveLoan, errorStrings.validApproveLoan,
    );
    errors.push(approvalError);

    const error = Validator.findErrors(errors);

    if (error.length > 0) {
      return responseHelper.error(res, 400, error);
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
    const errors = [];
    const { amount, tenor } = req.body;

    const loanIdError = Validator.validate(
      req.params.loanId, rules.empty, rules.validUuid, errorStrings.validLoanId,
    );
    errors.push(loanIdError);

    const amountError = Validator.validate(
      amount, rules.empty, rules.validAmount, errorStrings.validAmount,
    );
    errors.push(amountError);

    const tenorError = Validator.validate(
      tenor, rules.empty, rules.validTenor, errorStrings.validTenor,
    );
    errors.push(tenorError);

    const error = Validator.findErrors(errors);

    if (error.length > 0) {
      return responseHelper.error(res, 400, error);
    }
    return next();
  }

  /**
   * validate loanid from request.body.loanId
   * @param {Object} req request object
   * @param {Object} res response object
   * @callback {Function} next
   * @return {Object} error json object
   */

  static validateLoanId(req, res, next) {
    const errors = [];

    const loanIdError = Validator.validate(
      req.params.loanId, rules.empty, rules.validUuid, errorStrings.validLoanId,
    );
    errors.push(loanIdError);

    const error = Validator.findErrors(errors);

    if (error.length > 0) {
      return responseHelper.error(res, 400, error[0]);
    }
    return next();
  }
}

export default ValidateLoans;
