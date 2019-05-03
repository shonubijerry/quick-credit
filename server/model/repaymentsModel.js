import repayments from '../dummy/repayments'
import Utils from '../helpers/utils';
import LoansModel from './loansModel';

/**
* @fileOverview - class manages all users data storage
* @class - RepaymentsModel
* @exports - repaymentsModel.js
* @requires - ../helpers/loanHelper
* @requires - ../dummy/repayments
**/

class RepaymentsModel {
    
    /**
     * Get a single loan repayments
     * @param {object} loanId 
     * @returns {object} an object with loan repayments
     */

    static getLoanRepayments (loanId) {

        const loanRepayments = Utils.findInArray(loanId, repayments, 'loanId');
        
        for (let repayment of loanRepayments) {
            delete repayment.id;
            const loan = LoansModel.getSingleLoan(repayment.loanId);
            repayment.monthlyInstallment = loan.paymentInstallment;
        }
        
        return loanRepayments;
    }

}

export default RepaymentsModel;