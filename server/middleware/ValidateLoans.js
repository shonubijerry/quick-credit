import errorStrings from '../helpers/errorStrings';
import Validator from '../helpers/Validator';
import rules from '../helpers/rules';


/**
 *    @fileOverview Class to validate loans form submission
 *    @class ValidateLoans
 *    @requires ../helpers/errorStrings
 *    @requires ../helpers/Validator
 *    @requires ../helpers/rules
 *    @exports ValidateLoans
 */

class ValidateLoans {
  /**
   * validate signup input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next 
   */

  static validateApplication(request, response, next) {

    const errors = ValidateLoans.checkApplicationErrors(request.body);

    Validator.checkValidationErrors(response, errors, next);
  }

  /**
   * collect all possible errors
   * @param {Object} request 
   * @return {String} errors
   */

  static checkApplicationErrors ({amount, tenor}) {
    const errors = {};

    if (!amount || !rules.empty.test(amount) || !rules.validAmount.test(amount))
       errors.validAmount = errorStrings.validAmount;
       
    if (!tenor || !rules.empty.test(tenor) || !rules.validTenor.test(tenor))
       errors.validTenor = errorStrings.validTenor;
  
    return errors;
  }


}

export default ValidateLoans;
