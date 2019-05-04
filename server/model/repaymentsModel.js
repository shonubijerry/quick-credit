import repayments from '../dummy/repayments';
import Utils from '../helpers/utils';
import LoansModel from './loansModel';

/**
* @fileOverview - class manages all users data storage
* @class - RepaymentsModel
* @exports - repaymentsModel.js
* @requires - ../helpers/loanHelper
* @requires - ../dummy/repayments
* */

class RepaymentsModel {
  /**
     * Get a single loan repayments
     * @param {object} loanId
     * @returns {object} an object with loan repayments
     */

  static getLoanRepayments(loanId) {
    const repaymentsBuild = [];
    const loanRepayments = Utils.findInArray(loanId, 'loanId', repayments);
    const loan = LoansModel.getSingleLoan(loanId);

    loanRepayments.forEach((entry) => {
      repaymentsBuild.push({
        loanId: entry.loanId,
        createdOn: entry.createdOn,
        monthlyInstallment: loan.paymentInstallment,
        amount: entry.amount,
      });
    });
    return repaymentsBuild;
  }
}

export default RepaymentsModel;
