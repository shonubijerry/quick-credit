
/**
 *    @fileOverview Class to hold general validation methods
 *    @class Validator
 *    @exports Validator
 */

class Validator {

  /**
   * check if data validation produces any errors
   * @param {Object} request
   * @return {boolean} false
   */
  static checkValidationErrors(res, error, next) {
    if (Object.keys(error).length > 0) {
      return res.status(406).json({
        status: 406,
        error
      });
    }
    return next();
  }
}
export default Validator;
