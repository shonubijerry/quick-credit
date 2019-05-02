import RepaymentsModel from '../model/repaymentsModel'
import ResponseHelper from '../helpers/responseHelper'
import errorStrings from '../helpers/errorStrings';

/**
* @fileOverview - class manages all loan repayments
* @class - RepaymentsController
* @requires - ../model/RepaymentsModel
* @requires - ../helpers/ResponseHelper
* @requires - ../helpers/errorStrings
* @exports - repaymentsController.js
**/

class RepaymentsController {

    /**
     * Get a single loan's repayments
     * @param {object} req 
     * @param {object} res
     * @returns {object} json response object
     */

    static getLoanRepayments (req, res) {

        const loanId = parseInt(req.params.loanId, 10);
        const loanRepayments = RepaymentsModel.getLoanRepayments(loanId);

        if (loanRepayments.length > 0){
            return res.status(200).send({
                status: 200,
                data: loanRepayments
            });
        } else {
            ResponseHelper.errorResponse(res, errorStrings.noRepayments);
        }
    }


}

export default RepaymentsController;