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
      const user = await loansModel.selectWithJoin(
        'amount, tenor, balance, createdon loandate, paymentinstallment monthlyinstallment, loanuser, firstname, lastname, address',
        'loans.id=$1',
        'JOIN users ON (loans.loanuser = users.email)',
        [loanId],
      );
      if (user.rows.length < 1) {
        return 'no-loan';
      }
      const [result] = user.rows;
      const { rows } = await this.selectWhere('*', 'loanid=$1', [loanId]);
      result.repayments = rows;
      return result;
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

  async createRepayment(loanId, loan, amount, tenor) {
    try {
      const validationError = RepaymentsModel.validateRepayment(loan, amount, tenor);
      if (validationError) {
        return validationError;
      }
      const paidAmount = amount * tenor;
      const { rows } = await this.insert('id, loanid, amount', '$1, $2, $3', [uuid(), loanId, paidAmount]);
      const update = await loansModel.updateLoanAfterRepayment(loanId, paidAmount, loan.balance);

      const user = await loansModel.selectWithJoin(
        'amount, tenor, balance, createdon loandate, paymentinstallment monthlyinstallment, loanuser, firstname, lastname, address',
        'loans.id=$1',
        'JOIN users ON (loans.loanuser = users.email)',
        [update.id],
      );

      const result = user.rows[0];
      [result.repayment] = rows;
      return result;
    } catch (error) {
      throw error;
    }
  }

  static validateRepayment(loan, amount, tenor) {
    if (!loan) {
      return 'no-loan';
    }
    const expectedAmount = Number.parseFloat(loan.paymentinstallment);
    const paidAmount = Number.parseFloat(amount);
    if (loan.status !== 'approved') {
      return 'not-approved';
    }
    if (expectedAmount !== paidAmount) {
      return 'not-amount';
    }
    if (loan.repaid) {
      return 'loan-repaid';
    }
    if ((amount * tenor) > loan.balance) {
      return 'over-payment';
    }
    return '';
  }
}

export default RepaymentsModel;
