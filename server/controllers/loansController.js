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


}

export default LoansController;