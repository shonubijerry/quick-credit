import LoansModel from '../model/loansModel';
import ResponseHelper from '../helpers/responseHelper';
import Utils from '../helpers/utils';
import errorStrings from '../helpers/errorStrings';
import Auth from '../middleware/Auth';

const loansModel = new LoansModel('loans');

/**
* @fileOverview - class manages all users logic
* @class - LoansController
* @requires - ../model/LoansModel
* @requires - ../helpers/responseHelper
* @requires - ../helpers/utils
* @requires - ../helpers/errorStrings'
* @exports - loansController.js
* */

class LoansController {
  /**
     * Create a loan application
     * @param {object} req
     * @param {object} res
     */

  static async createLoan(req, res) {
    try {
      const userEmail = req.token.user.email;
      const currentLoan = await loansModel.checkCurrentOrPendingLoan(userEmail);
      if (currentLoan) {
        return ResponseHelper.error(
          res, 409,
          `You have an unpaid loan of ${currentLoan.balance} which is under review or yet to be fully repaid`,
        );
      }
      const newLoan = await loansModel.createLoan(req, userEmail);
      return ResponseHelper.success(res, 201, newLoan);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
     * Get all loan applications (for users and admin)
     * @param {object} req
     * @param {object} res
     * @returns {object} return all user's loan applications or all loans if admin
     */

  static async getLoans(req, res) {
    try {
      req.token = Auth.verifyToken(req.headers.token);
      const { email, isadmin } = req.token.user;
      if (Utils.hasQuery(req)) {
        const loans = await LoansController.perpareLoansQuery(req, res, isadmin);
        return loans;
      }
      const loans = await loansModel.getLoans(email, isadmin);
      return ResponseHelper.success(res, 200, loans);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
     * Get queries for API endpoint /loans?...
     * @param {object} req
     * @param {object} res
     * @returns {object} return current loan or repaid loan
     * or 404 error if no loans, or query is wrong
     */

  static async perpareLoansQuery(req, res, isadmin) {
    try {
      const { status, repaid } = req.query;
      if (status === 'approved' && (repaid === 'false' || repaid === 'true')) {
        if (!isadmin) {
          return ResponseHelper.error(res, 403, errorStrings.notAllowed);
        }
        const loans = await loansModel.getCurrentOrRepaidLoans(repaid);
        return ResponseHelper.success(res, 200, loans);
      }
      return ResponseHelper.error(res, 404, errorStrings.pageNotFound);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
     * Get a specific loan (admin privilege)
     * @param {object} req
     * @param {object} res
     * @returns {object} json response object
     */

  static async getLoan(req, res) {
    try {
      const { loanId } = req.params;
      const loan = await loansModel.getSingleLoanById(loanId);
      if (!loan) {
        return ResponseHelper.error(res, 404, errorStrings.noLoan);
      }
      return ResponseHelper.success(res, 200, loan);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
  * Approve or reject a loan application (admin privilege)
  * @param {object} req
  * @param {object} res
  * @returns {object} Return approved or rejected loan if successfully updated
  * Or return a conflict error if action has already been taken
  * Or return 404 error if loan not found
  */

  static async approveRejectLoan(req, res) {
    const { loanId } = req.params;
    const { status } = req.body;
    try {
      const foundLoan = await loansModel.getSingleLoanById(loanId);
      if (!foundLoan) {
        return ResponseHelper.error(res, 404, errorStrings.noLoan);
      }
      if (foundLoan.status === status) {
        return ResponseHelper.error(res, 409, `${errorStrings.alreadyApproved} ${status}`);
      }

      const approvedLoan = await loansModel.approveLoan(loanId, status);
      return ResponseHelper.success(res, 200, approvedLoan);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }
}

export default LoansController;
