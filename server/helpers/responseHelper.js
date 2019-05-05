/**
 *    @fileOverview Class to hold response messages
 *    @class ResponseHelper
 *    @exports ResponseHelper
 */

class ResponseHelper {
  /**
     * success: prepare json response for API endpoint
     * @param {object} res
     * @param {Number} status
     * @param {object} data
    * */

  static success(res, status, message) {
    return res.status(status).json({
      status,
      data: message,
    });
  }

  /**
     * error: prepare json response for API endpoint
     * @param {object} res
     * @param {Number} status
     * @param {object} error
     * @returns {object} response json
    * */

  static error(res, status, error) {
    return res.status(status).json({
      status,
      error,
    });
  }
}


export default ResponseHelper;
