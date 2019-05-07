import loans from '../dummy/loans';
import LoanHelper from '../helpers/loanHelper';
import Utils from '../helpers/utils';

/**
* @fileOverview - class manages all users data storage
* @class - LoansModel
* @exports - loansModel.js
* @requires - ../helpers/password
* @requires - ../dummy/loans
* */

class LoansModel {
  /**
     * Add new user to data structure
     * @param {object} req
     * @returns {object} user
     * @returns {object} returns created loan as an object
     */

  static createLoan(req, user) {
    let { tenor, amount } = req.body;
    tenor = parseFloat(tenor);
    amount = parseFloat(amount);
    const interest = LoanHelper.getInterest(amount).toFixed(2);
    const balance = LoanHelper.getBalance(amount).toFixed(2);
    const paymentInstallment = LoanHelper.getInstallment(amount, tenor).toFixed(2);
    const newLoan = {
      id: loans.length + 1,
      user,
      createdOn: Utils.getNow(),
      status: 'pending',
      repaid: false,
      tenor,
      amount,
      paymentInstallment,
      balance,
      interest,
    };

    loans.push(newLoan);
    return newLoan;
  }

  /**
     * Get single user loans
     * @param {object} email
     * @returns {object} an object with all loans
     */

  static getLoans(email, isAdmin) {
    if (isAdmin === true) {
      return loans;
    }
    return Utils.findInArray(email, 'user', loans);
  }

  /**
     * Get single loans by loanId
     * @param {object} loanId
     * @returns {object} a single loan object
     */

  static getSingleLoan(loanId) {
    return Utils.findSingleItem(loanId, 'id', loans);
  }

  /**
     * Get current loans
     * @param {object} query
     * @returns {object} an object with array of current loans
     */

  static getCurrentLoans() {
    return Utils.findDoubleKeysInArray(loans, 'status', 'approved', 'repaid', false);
  }

  /**
     * Get repaid loans
     * @param {object} query
     * @returns {object} an object with array of repaid loans
     */

  static getRepaidLoans() {
    return Utils.findDoubleKeysInArray(loans, 'status', 'approved', 'repaid', true);
  }

  /**
  * Approve a loan application
  * @param {object} loanId id of loan to update
  * @param {object} status status to update to (approved or rejected)
  * @returns {object} return json response object with approved loan data or error if
  * loan is approved or does't exist
  */

  static approveLoan(loanId, status) {
    let info;
    const foundItem = Utils.updateItems(loans, 'id', loanId);
    if (foundItem === false) {
      info = 'no-loan';
    } else if (foundItem.item.status === status) {
      info = 'no-action';
    } else {
      foundItem.item.status = status;
      loans.splice(foundItem.index, 1, foundItem.item);
      info = foundItem.item;
    }

    return info;
  }

  /**
  * Update loan application after each repayment by subtracting paid amount from balance
  * and check if there is no balance. If there is no more balance, then loan is repaid.
  * @param {object} loanId id of loan to update
  * @param {float} amount amount repaid for user's loan
  * @returns {object} return json object with updated loan data
  */

  static updateLoanAfterRepayment(loanId, amount) {
    const foundItem = Utils.updateItems(loans, 'id', loanId);

    foundItem.item.balance -= Number.parseFloat(amount);
    if (foundItem.item.balance < 1) { // check if this is the last repayment
      foundItem.item.repaid = true;
    }
    const updatedLoan = loans.splice(foundItem.index, 1, foundItem.item);
    return updatedLoan[0]; // loans.splice returned an array with updated object as only element
  }

  /**
  * Check if a user has an unpaid loan
  * @param {object} email
  * @returns {object} loan object and boolean isFound
  */

  static checkCurrentLoan(email) {
    const foundLoan = loans.find(loan => (loan.user === email && loan.repaid === false && (loan.status === 'pending' || loan.status === 'approved')));
    if (foundLoan) {
      return { isFound: true, foundLoan };
    }
    return { isFound: false };
  }
}

export default LoansModel;
