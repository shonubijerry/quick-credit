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
      ResponseHelper.error(res, 406, `You have an unpaid loan of ${currentLoan.foundLoan.amount} which is under review or yet to be fully repaid`);
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
      const { status, repaid } = req.query;
      if (status === 'approved' && repaid === 'false') {
        return LoansController.getCurrentLoans(res);
      }
      if (status === 'approved' && repaid === 'true') {
        return LoansController.getRepaidLoans(res);
      }
      return ResponseHelper.error(res, 404, errorStrings.pageNotFound);
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
     * Get a specific loan (admin privilege)
     * @param {object} req
     * @param {object} res
     * @returns {object} json response object
     */

  static getLoan(req, res) {
    const userId = Number.parseInt(req.params.loanId, 10);

    const loan = loansModel.getSingleLoan(userId);
    if (loan === undefined) {
      return ResponseHelper.error(res, 404, errorStrings.noLoan);
    }
    return ResponseHelper.success(res, 200, loan);
  }

  /**
     * Get all current loans (admin privilege)
     * @param {object} req
     * @param {object} res
     * @returns {object} Loans that have status = approved and repaid = false
     */

  static getCurrentLoans(res) {
    let currentLoans = {};
    currentLoans = loansModel.getCurrentLoans();

    if (currentLoans.error === false) {
      return ResponseHelper.error(res, 404, errorStrings.noLoans);
    }
    return ResponseHelper.success(res, 200, currentLoans);
  }

  /**
     * Get all repaid loans (admin privilege)
     * @param {object} req
     * @param {object} res
     * @returns {object} Loans that have status = approved and repaid = false
     */

  static getRepaidLoans(res) {
    let repaidLoans = {};
    repaidLoans = loansModel.getRepaidLoans();

    if (repaidLoans.error === false) {
      return ResponseHelper.error(res, 404, errorStrings.noLoans);
    }
    return ResponseHelper.success(res, 200, repaidLoans);
  }
}

export default LoansController;
