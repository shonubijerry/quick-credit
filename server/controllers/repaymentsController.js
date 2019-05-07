import RepaymentsModel from '../model/repaymentsModel';
import ResponseHelper from '../helpers/responseHelper';
import errorStrings from '../helpers/errorStrings';
import Utils from '../helpers/utils';

/**
* @fileOverview - class manages all loan repayments
* @class - RepaymentsController
* @requires - ../model/RepaymentsModel
* @requires - ../helpers/ResponseHelper
* @requires - ../helpers/errorStrings
* @exports - repaymentsController.js
* */

class RepaymentsController {
  /**
     * Get a single loan's repayments
     * @param {object} req
     * @param {object} res
     * @returns {object} json response object
     */

  static getLoanRepayments(req, res) {
    const loanId = parseInt(req.params.loanId, 10);
    const loanRepayments = RepaymentsModel.getLoanRepayments(loanId);
    if (Utils.checkLength(loanRepayments) > 0) {
      return ResponseHelper.success(res, 200, loanRepayments);
    }
    return ResponseHelper.error(res, 406, errorStrings.noRepayments);
  }

  /**
     * Create a loan repayment
     * @param {object} req
     * @param {object} res
     * @returns {object} json response object created loan repayment
     */

  static createRepayment(req, res) {
    const loanId = parseInt(req.params.loanId, 10);
    const { amount } = req.body;
    const newRepayment = RepaymentsModel.createRepayment(loanId, amount);
    if (newRepayment === 'not-approved') {
      return ResponseHelper.error(res, 406, errorStrings.notApproved);
    }
    if (newRepayment === 'not-amount') {
      return ResponseHelper.error(res, 406, errorStrings.notAmount);
    }
    if (newRepayment === 'loan-repaid') {
      return ResponseHelper.error(res, 406, errorStrings.loanRepaid);
    }
    return ResponseHelper.success(res, 201, newRepayment);
  }
}

export default RepaymentsController;
