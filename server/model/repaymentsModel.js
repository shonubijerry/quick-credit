import repayments from '../dummy/repayments'
import Utils from '../helpers/utils';

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

        return Utils.findInArray(loanId, repayments, 'loanId');
    }

}

export default RepaymentsModel;