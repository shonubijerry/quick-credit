import RepaymentsModel from '../model/repaymentsModel';
import ResponseHelper from '../helpers/responseHelper';
import errorStrings from '../helpers/errorStrings';
import LoansModel from '../model/loansModel';

const repaymentModel = new RepaymentsModel('repayments');
const loansModel = new LoansModel('loans');
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

  static async getLoanRepayments(req, res) {
    try {
      const { loanId } = req.params;
      const loanRepayments = await repaymentModel.getLoanRepayments(loanId);
      if (!loanRepayments) {
        return ResponseHelper.error(res, 404, errorStrings.noRepayments);
      }
      return ResponseHelper.success(res, 200, loanRepayments);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
     * Create a loan repayment
     * @param {object} req
     * @param {object} res
     * @returns {object} json response object created loan repayment
     */

  static async createRepayment(req, res) {
    try {
      const { loanId } = req.params;
      const amount = Number.parseFloat(req.body.amount);
      const newRepayment = await repaymentModel.createRepayment(loanId, amount);
      switch (newRepayment) {
        case 'no-loan': {
          return ResponseHelper.error(res, 404, errorStrings.noLoan);
        }
        case 'not-approved': {
          return ResponseHelper.error(res, 400, errorStrings.notApproved);
        }
        case 'not-amount': {
          const theLoan = await loansModel.getSingleLoanById(loanId);
          return ResponseHelper.error(res, 409, `${errorStrings.notAmount} ${theLoan.paymentinstallment}`);
        }
        case 'loan-repaid': {
          return ResponseHelper.error(res, 409, errorStrings.loanRepaid);
        }
        default: {
          return ResponseHelper.success(res, 201, newRepayment);
        }
      }
    } catch (error) {
      return ResponseHelper.error(res, 500, error.message);
    }
  }
}

export default RepaymentsController;
