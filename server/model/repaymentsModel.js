import repayments from '../dummy/repayments'

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
     * @param {object} req 
     * @returns {object} an object with all repayments
     */

    static getLoanRepayments (loanId) {

        const loanRepayments = [];
        
        for ( let singleRepayment of repayments ){
            if (singleRepayment.loanId === loanId ){
                loanRepayments.push(singleRepayment);
            }
        }
        return loanRepayments;
    }

}

export default RepaymentsModel;