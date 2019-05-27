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

  async createRepayment(loanId, amount) {
    try {
      const loan = await loansModel.getSingleLoanById(loanId);
      const validationError = RepaymentsModel.validateRepayment(loan, amount);
      if (validationError) {
        return validationError;
      }
      const { rows } = await this.insert('id, loanid, amount', '$1, $2, $3', [uuid(), loanId, Number.parseFloat(amount)]);
      const updatedLoan = await loansModel.updateLoanAfterRepayment(loanId, amount, loan.balance);

      const user = await loansModel.selectWithJoin(
        'amount, tenor, balance, createdon loandate, paymentinstallment monthlyinstallment, loanuser, firstname, lastname, address',
        'loans.id=$1',
        'JOIN users ON (loans.loanuser = users.email)',
        [updatedLoan.id],
      );

      const result = user.rows[0];
      [result.repayment] = rows;
      return result;
    } catch (error) {
      throw error;
    }
  }

  static validateRepayment(loan, amount) {
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
    return '';
  }
}

export default RepaymentsModel;
