/**
*   @fileOverview - This class helps generate loan parameters
*   @class LoanHelper
*   @exports loanHelper
**/

class LoanHelper {

    /**
     * calculate interest
     * @param {float} amount
     * @returns {float} 
     */

    static getInterest(amount) {
        return amount * 0.05;
    }

    /**
     * calculate balance
     * @param {float} amount
     * @returns {float} 
     */

    static getBalance(amount) {
        return amount + this.getInterest(amount);
    }

    /**
     * calculate paymentInstallment
     * @param {integer} tenor
     * @returns {float} 
     */

    static getInstallment(amount, tenor) {
        return this.getBalance(amount) / tenor;
    }

}


export default LoanHelper;