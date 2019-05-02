/**
 *    @fileOverview Class to hold response messages
 *    @class ResponseHelper
 *    @exports ResponseHelper
 */

class ResponseHelper {

    /**
     * success ok response 200
     * @param {object} res
     * @param {object} error
    **/
  
    static successOk(res, message){
      return res.status(200).json({
        status: 200,
        data: {
          message,
        }
      });
    }

    /**
     * return unauthorized error response 401
     * @param {object} res
     * @param {object} error
     * @returns {object} response json
    **/
  
    static errorUnauthorized(res, error){
      return res.status(401).json({
        status: 401,
        error
      });
    }

    // /**
    //  * return forbidden error response 403
    //  * @param {object} res
    //  * @param {object} error
    // **/
  
    // static forbiddenError(res, error){
    //   return res.status(403).json({
    //     status: 403,
    //     error
    //   });
    // }

    /**
     * return unacceptable error response 404
     * @param {object} res
     * @param {object} error
    **/
  
    static errorNotFound(res, error){
      return res.status(404).json({
        status: 404,
        error
      });
    }
    
    /**
     * return unacceptable error response 406
     * @param {object} res
     * @param {object} error
    **/
  
    static errorResponse(res, error){
      return res.status(406).json({
        status: 406,
        error
      });
    }
  
}


export default ResponseHelper;