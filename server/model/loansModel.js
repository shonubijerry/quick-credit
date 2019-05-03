import loans from '../dummy/loans'
import LoanHelper from '../helpers/loanHelper'
import Utils from '../helpers/utils'

/**
* @fileOverview - class manages all users data storage
* @class - LoansModel
* @exports - loansModel.js
* @requires - ../helpers/password
* @requires - ../dummy/loans
**/

class LoansModel {

    /**
     * Add new user to data structure
     * @param {object} req 
     * @returns {object} user
     * @returns {object} returns created loan as an object
     */

    static createLoan (req, user) {
        let {tenor, amount} = req.body;
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
            interest
        }
        
        loans.push(newLoan);
        return newLoan;
    }
    
    /**
     * Get single user loans
     * @param {object} req 
     * @returns {object} an object with all loans
     */

    static getUserLoans (email) {
        
        return Utils.findInArray(email, loans, 'user');
    }
    
    /**
     * Get a single loan entry
     * @param {object} loanId 
     * @returns {object} return a single loan object
     */

    static getSingleLoan (loanId) {
        
        return Utils.getSingleObject(loanId, loans, 'id');
        
    }

    /**
     * Check if a user has an unpaid loan
     * @param {object} req 
     * @returns {object} user
     */

    static checkCurrentLoan (email) {
        const loan = loans.find(loan => 
            loan.user === email && loan.repaid === false && (loan.status === 'pending' || loan.status === 'approved')
        );
        if(loan){
            return {isFound: true, loan};
        }
        return {isFound: false};
    }
    

}

export default LoansModel;