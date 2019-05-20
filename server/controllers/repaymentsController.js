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
      let errorInfo = {};
      switch (newRepayment) {
        case 'no-loan': {
          errorInfo = { status: 404, error: errorStrings.noLoan };
          break;
        }
        case 'not-approved': {
          errorInfo = { status: 400, error: errorStrings.notApproved };
          break;
        }
        case 'not-amount': {
          const theLoan = await loansModel.getSingleLoanById(loanId);
          errorInfo = { status: 409, error: `${errorStrings.notAmount} ${theLoan.paymentinstallment}` };
          break;
        }
        case 'loan-repaid': {
          errorInfo = { status: 409, error: errorStrings.loanRepaid };
          break;
        }
        default: {
          return ResponseHelper.success(res, 201, newRepayment);
        }
      }
      return ResponseHelper.error(res, errorInfo.status, errorInfo.error);
    } catch (error) {
      return ResponseHelper.error(res, 500, error.message);
    }
  }
}

export default RepaymentsController;
