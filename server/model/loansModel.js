import uuid from 'uuid';
import Model from './model';

/**
* @fileOverview - class manages all users data storage
* @class - LoansModel
* @exports - loansModel.js
* @requires - ../helpers/password
* @requires - ../dummy/loans
* */

class LoansModel extends Model {
  /**
     * Add new user to data structure
     * @param {object} req
     * @returns {object} user
     * @returns {object} returns created loan as an object
     */

  async createLoan(req, email) {
    try {
      let { tenor, amount } = req.body;
      tenor = parseInt(tenor, 10);
      amount = parseFloat(amount).toFixed(2);
      const interest = parseFloat(amount) * 0.05;
      const sumAmountInterst = parseFloat(amount) + parseFloat(interest.toFixed(2));
      const paymentInstallment = (sumAmountInterst / tenor).toFixed(2);
      const balance = parseFloat(paymentInstallment) * tenor;
      const { rows } = await this.insert(
        'id, loanuser, tenor, amount, paymentinstallment, balance, interest',
        '$1, $2, $3, $4, $5, $6, $7',
        [
          uuid(), email, tenor, amount, parseFloat(paymentInstallment), balance, interest,
        ],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
     * Get single user loans
     * @param {object} email
     * @returns {object} an object with all loans
     */

  async getLoans(email, isAdmin) {
    try {
      if (isAdmin) {
        const { rows } = await this.select('*');
        return rows;
      }
      const { rows } = await this.selectWhere('*', 'loanuser=$1', [email]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
     * Check if a user have current loan or pending loan
     * @param {object} email
     * @returns {object} a single loan object
     */

  async checkCurrentOrPendingLoan(email) {
    try {
      const { rows } = await this.selectWhere('*', 'loanuser=$1 and repaid=$2 and status!=$3',
        [email, false, 'rejected']);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }


  /**
    * Get single loan by loanId
    * @param {String} email
    * @return boolean
    */

  async getSingleLoanById(loanId) {
    try {
      const { rows } = await this.selectWhere('*', 'id=$1', [loanId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
     * Get current or replaid loans depending on the argument
     * @returns {object} returns array of current loans or repaid loans
     */

  async getCurrentOrRepaidLoans(query) {
    try {
      const { rows } = await this.selectWhere('*', 'status=$1 AND repaid=$2', ['approved', query]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
  * Approve a loan application
  * @param {object} loanId id of loan to update
  * @param {object} status status to update to (approved or rejected)
  * @returns {object} return json response object with approved loan data or error if
  * loan is approved or does't exist
  */

  async approveLoan(loanId, status) {
    try {
      const { rows } = await this.update('status=$1', 'id=$2', [status, loanId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
  * Update loan balance after each repayment by subtracting paid amount from balance
  * and check if there is no balance. If there is no more balance, then loan is repaid.
  * @param {object} loanId id of loan to update
  * @param {float} amount amount repaid for user's loan
  * @returns {object} return json object with updated loan data
  */

  async updateLoanAfterRepayment(loanId, paidAmount, balance) {
    const newBalance = Number.parseFloat(balance) - Number.parseFloat(paidAmount);
    try {
      if (newBalance < 1) { // check if this is the last repayment
        const { rows } = await this.update('repaid=$1, balance=$2', 'id=$3', [true, newBalance, loanId]);
        return rows[0];
      }
      const { rows } = await this.update('balance=$1', 'id=$2', [newBalance, loanId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default LoansModel;
