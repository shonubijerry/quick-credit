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

  static validateApplication(req, res, next) {

    let errors = {};
    const {amount, tenor} = req.body;
    
    Object.assign(errors, Validator.validate(tenor, rules.empty, rules.validTenor, errorStrings.validTenor));
    Object.assign(errors, Validator.validate(amount, rules.empty, rules.validAmount, errorStrings.validAmount));

    Validator.findErrors(res, errors, next);   

  }


}

export default ValidateLoans;
