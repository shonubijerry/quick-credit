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
  static findErrors(res, errors, next) {
    if (Object.keys(errors).length > 0) {
      return res.status(406).json({
        status: 406,
        error: errors.errorKey,
      });
    }
    return next();
  }


  /**
   * collect all possible errors
   * @param {string} input form input
   * @param {string} emptyRule RegExp pattern to match empty input
   * @param {string} validRule RegExp pattern to match valid input
   * @param {String} errorString error message to return
   * @param {Object} errors
   */

  static validate(input, emptyRule, validRule, errorString) {
    const error = {};
    if (!input || !emptyRule.test(input) || !validRule.test(input)) {
      error.errorKey = errorString;
    }
    return error;
  }
}
export default Validator;
