import uuid from 'uuid';
import Model from './model';
import LoansModel from './loansModel';

/**
* @fileOverview - class manages all users data storage
* @class - RepaymentsModel
* @exports - repaymentsModel.js
* @requires - ./loansModel
* @requires - ../dummy/repayments
* @requires - ../helpers/utils
* */

const loansModel = new LoansModel('loans');

class RepaymentsModel extends Model {
  /**
     * Get a single loan repayments
     * @param {object} loanId
     * @returns {object} an object with loan repayments
     */

  async getLoanRepayments(loanId) {
    try {
      const { rows } = await this.selectWithJoin('repay.id, loanid, paymentinstallment monthlyinstallment, repay.createdon, repay.amount', 'loanid=$1', [loanId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
     * Create a new loan repayment
     * @param {object} loanId id of affected loan
     * @param {object} amount amount to be repaid
     * @returns {object} return object with loan repayment
     */

  async createRepayment(loanId, amount) {
    try {
      const loan = await loansModel.getSingleLoanById(loanId);
      if (!loan) {
        return 'no-loan';
      }
      if (loan.status !== 'approved') {
        return 'not-approved';
      }
      if (Number.parseFloat(loan.paymentinstallment) !== Number.parseFloat(amount)) {
        return 'not-amount';
      }
      if (loan.repaid) {
        return 'loan-repaid';
      }
      const id = uuid();
      const { rows } = await this.insert('id, loanid, amount', '$1, $2, $3', [id, loanId, Number.parseFloat(amount)]);
      const updatedLoan = await loansModel.updateLoanAfterRepayment(loanId, amount, loan.balance);
      // get paid amount because when repayment is merged with loan, amount will be overwritten
      rows[0].paidamount = rows[0].amount;
      // get monthlyinstallment as given in the response specification
      rows[0].monthlyinstallment = updatedLoan.paymentinstallment;
      // remove paymentinstallment since we already have monthlyinstallment
      delete updatedLoan.paymentinstallment;
      // merge repayment and it's referencing loan together into repayment
      Object.assign(rows[0], updatedLoan);
      // return repayment
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default RepaymentsModel;
