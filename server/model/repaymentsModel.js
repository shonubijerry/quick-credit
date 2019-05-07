import LoansModel from './loansModel';
import repayments from '../dummy/repayments';
import Utils from '../helpers/utils';

/**
* @fileOverview - class manages all users data storage
* @class - RepaymentsModel
* @exports - repaymentsModel.js
* @requires - ./loansModel
* @requires - ../dummy/repayments
* @requires - ../helpers/utils
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

  /**
     * Create a new loan repayment
     * @param {object} loanId id of affected loan
     * @param {object} amount amount to be repaid
     * @returns {object} return object with loan repayment
     */

  static createRepayment(loanId, amount) {
    const loan = LoansModel.getSingleLoan(loanId);
    if (loan.status !== 'approved') {
      return 'not-approved';
    }
    if (loan.paymentInstallment !== Number.parseFloat(amount)) {
      return 'not-amount';
    }
    if (loan.balance <= 0) {
      return 'loan-repaid';
    }
    const newRepayment = {
      id: repayments.length + 1,
      loanId: loan.id,
      createdOn: Utils.getNow(),
      amount,
    };
    repayments.push(newRepayment);
    const repaymentHistory = RepaymentsModel.getLoanRepayments(loanId);
    const paidAmount = Utils.sumProperty('amount', repaymentHistory);
    const updatedLoan = LoansModel.updateLoanAfterRepayment(loanId, amount);
    const returnedLoan = {
      id: newRepayment.id,
      loanId,
      createdOn: Utils.getNow(),
      amount,
      monthlyInstallment: updatedLoan.paymentInstallment,
      paidAmount,
      balance: updatedLoan.balance,
    };
    return returnedLoan;
  }
}

export default RepaymentsModel;
