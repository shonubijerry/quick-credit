import loansModel from '../model/loansModel';
import ResponseHelper from '../helpers/responseHelper';
import Utils from '../helpers/utils';
import errorStrings from '../helpers/errorStrings';

/**
* @fileOverview - class manages all users logic
* @class - LoansController
* @requires - ../model/loansModel
* @requires - ../helpers/token
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

  static createLoan(req, res) {
    const userEmail = req.token.user.email;
    const currentLoan = loansModel.checkCurrentLoan(userEmail);

    if (currentLoan.isFound === true) {
      ResponseHelper.error(res, 400, `You have an unpaid loan of ${currentLoan.foundLoan.amount} which is under review or yet to be fully repaid`);
    } else {
      const newLoan = loansModel.createLoan(req, userEmail);

      return res.status(201).send({
        status: 201,
        data: {
          loanId: newLoan.id,
          user: newLoan.user,
          createdOn: newLoan.createdOn,
          status: newLoan.status,
          repaid: newLoan.repaid,
          tenor: newLoan.tenor,
          amount: newLoan.amount,
          paymentInstallment: newLoan.paymentInstallment,
          balance: newLoan.balance,
          interest: newLoan.interest,
        },
      });
    }
    return null;
  }

  /**
     * Get all loan applications (for users and admin)
     * @param {object} req
     * @param {object} res
     * @returns {object} return all user's loan applications or all loans if admin
     */

  static getLoans(req, res) {
    let allLoans = {};
    if (Utils.hasQuery(req)) {
      return LoansController.perpareLoansQuery(req, res);
    }
    const userEmail = req.token.user.email;
    const { isAdmin } = req.token.user;

    allLoans = loansModel.getLoans(userEmail, isAdmin);

    if (Utils.checkLength(allLoans) > 0) {
      return ResponseHelper.success(res, 200, allLoans);
    }
    return ResponseHelper.error(res, 404, errorStrings.noLoans);
  }

  /**
     * Get query results for API endpoint /loans?...
     * @param {object} req
     * @param {object} res
     * @returns {object} return current loan or repaid loan or 404 error if query is wrong
     */

  static perpareLoansQuery(req, res) {
    const { status, repaid } = req.query;
    if (status === 'approved' && (repaid === 'false' || repaid === 'true')) {
      return LoansController.processLoansQuery(repaid, res);
    }
    return ResponseHelper.error(res, 404, errorStrings.pageNotFound);
  }

  /**
     * Get query results for API endpoint /loans?...
     * @param {object} req
     * @param {object} res
     * @returns {object} json objects current loans or repaid loans or 404 error no loans found
     */

  static processLoansQuery(repaid, res) {
    let queryResult = {};
    if (repaid === 'true') {
      queryResult = loansModel.getRepaidLoans();
    }
    if (repaid === 'false') {
      queryResult = loansModel.getCurrentLoans();
    }
    if (queryResult.error === false) {
      return ResponseHelper.error(res, 404, errorStrings.noLoans);
    }
    return ResponseHelper.success(res, 200, queryResult);
  }

  /**
     * Get a specific loan (admin privilege)
     * @param {object} req
     * @param {object} res
     * @returns {object} json response object
     */

  static getLoan(req, res) {
    const userId = Number.parseInt(req.params.loanId, 10);

    const loan = loansModel.getSingleLoan(userId);
    if (loan === 'no-loan') {
      return ResponseHelper.error(res, 404, errorStrings.noLoan);
    }
    return ResponseHelper.success(res, 200, loan);
  }

  /**
  * Approve a loan application (admin privilege)
  * @param {object} req
  * @param {object} res
  * @returns {object} on success json response object with approved loan data or error
  * if loan is already approved or loan does not exist
  */

  static approveLoan(req, res) {
    const loanId = Number.parseInt(req.params.loanId, 10);
    const { status } = req.body;

    const foundLoan = loansModel.approveLoan(loanId, status);
    if (foundLoan === 'no-loan') {
      return ResponseHelper.error(res, 404, errorStrings.noLoan);
    }
    if (foundLoan === 'no-action') {
      return ResponseHelper.error(res, 400, errorStrings.alreadyApproved);
    }
    const approvedLoan = {
      loanId: foundLoan.id,
      loanAmount: foundLoan.amount,
      tenor: foundLoan.tenor,
      status: foundLoan.status,
      monthlyInstallment: foundLoan.paymentInstallment,
      interest: foundLoan.interest,
    };
    return ResponseHelper.success(res, 200, approvedLoan);
  }
}

export default LoansController;
