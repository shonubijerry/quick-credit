import RepaymentsModel from '../model/repaymentsModel';
import ResponseHelper from '../helpers/responseHelper';
import errorStrings from '../helpers/errorStrings';
import Utils from '../helpers/utils';
import LoansModel from '../model/loansModel';

/**
* @fileOverview - class manages all loan repayments
* @class - RepaymentsController
* @requires - ../model/RepaymentsModel
* @requires - ../helpers/ResponseHelper
* @requires - ../helpers/errorStrings
* @requires - ../model/loansModel
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
    return ResponseHelper.success(res, 200, {});
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
    switch (newRepayment) {
      case 'no-loan': {
        return ResponseHelper.error(res, 404, errorStrings.noLoan);
      }
      case 'not-approved': {
        return ResponseHelper.error(res, 400, errorStrings.notApproved);
      }
      case 'not-amount': {
        const { paymentInstallment } = LoansModel.getSingleLoan(loanId);
        return ResponseHelper.error(res, 400, `${errorStrings.notAmount} ${paymentInstallment.toFixed(2)}`);
      }
      case 'loan-repaid': {
        return ResponseHelper.error(res, 409, errorStrings.loanRepaid);
      }
      default: {
        break;
      }
    }
    return ResponseHelper.success(res, 201, newRepayment);
  }
}

export default RepaymentsController;
