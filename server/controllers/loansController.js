import loansModel from '../model/loansModel'
import ResponseHelper from '../helpers/responseHelper'

/**
* @fileOverview - class manages all users logic
* @class - LoansController
* @requires - ../model/loansModel
* @requires - ../helpers/token
* @requires - ../helpers/errorStrings
* @exports - loansController.js
**/

class LoansController {

    /**
     * Create a loan application
     * @param {object} req 
     * @param {object} res
     */

    static createLoan (req, res) {  
        
        const userEmail = req.token.user.email;
        const currentLoan = loansModel.checkCurrentLoan(userEmail)

        if(currentLoan.isFound === true ) {

            ResponseHelper.errorResponse(res, `You have an unpaid loan of ${currentLoan.loan.amount} which is under review or yet to be fully repaid`);

        } else {
            const newLoan = loansModel.createLoan(req, userEmail);

            return res.status(201).send({
                status: 201,
                data: {
                    loanId: newLoan.id,
                    user: newLoan.user,
                    createdOn: newLoan.createdOn,
                    status: newLoan.status,
                    repaid: newLoan.repaid,
                    tenor: newLoan.tenor,
                    amount: newLoan.amount,
                    paymentInstallment: newLoan.paymentInstallment,
                    balance: newLoan.balance,
                    interest: newLoan.interest
                }
            });
        }
        
    }

    /**
     * Get all loan applications
     * @param {object} req 
     * @param {object} res
     * @returns {object} json response object
     */

    static getAllLoans (req, res) {

        const userEmail = req.token.user.email;
        const allLoans = loansModel.getUserLoans(userEmail);

        if (allLoans.length > 0){
            return res.status(200).send({
                status: 200,
                data: allLoans
            });
        } else {
            ResponseHelper.errorResponse(res, "You currently do not have any loan to display");
        }
    }


}

export default LoansController;