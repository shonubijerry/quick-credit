/**
 *    @fileOverview Class to hold response messages
 *    @class ResponseHelper
 *    @exports ResponseHelper
 */

class ResponseHelper {

    /**
     * return error response
     * @param {object} res
     * @param {string} error
    **/
  
   static errorResponse(res, error){
    return res.status(406).json({
      status: 406,
      error
    });
  }
  
}
export default ResponseHelper;