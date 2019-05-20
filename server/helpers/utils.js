/**
*   @fileOverview - This class helps generate repeated codes
*   @class Utils
*   @exports Utils
* */

class Utils {
  /**
     * Check if an API requst has query
     * @param {object} req
     * @returns {object} return true if the request has query or false otherwise
     */

  static hasQuery(req) {
    if (Object.keys(req.query).length > 0) {
      return true;
    }
    return false;
  }
}

export default Utils;
