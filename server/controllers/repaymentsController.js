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
      if (loanRepayments === 'no-loan') {
        return ResponseHelper.error(res, 404, errorStrings.noLoan);
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
      const inputAmount = Number.parseFloat(req.body.amount);
      const inputTenor = Number.parseInt(req.body.tenor, 10);
      const loan = await loansModel.getSingleLoanById(loanId);
      const repayment = await repaymentModel.createRepayment(loanId, loan, inputAmount, inputTenor);
      const error = await RepaymentsController.validateRepayment(repayment, inputTenor, loan);

      if (error) {
        return ResponseHelper.error(res, error.status, error.error);
      }
      return ResponseHelper.success(res, 201, repayment);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  static async validateRepayment(newRepayment, tenor, loan) {
    let responseData = {};
    switch (newRepayment) {
      case 'no-loan': {
        responseData = { status: 404, error: errorStrings.noLoan };
        break;
      }
      case 'not-approved': {
        responseData = { status: 400, error: errorStrings.notApproved };
        break;
      }
      case 'not-amount': {
        responseData = { status: 409, error: `${errorStrings.notAmount} ${loan.paymentinstallment}` };
        break;
      }
      case 'loan-repaid': {
        responseData = { status: 409, error: errorStrings.loanRepaid };
        break;
      }
      case 'over-payment': {
        responseData = { status: 409, error: `${errorStrings.notBalance} ${loan.balance}` };
        break;
      }
      default: {
        return false;
      }
    }
    return responseData;
  }
}

export default RepaymentsController;
