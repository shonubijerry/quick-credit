import jwt from 'jsonwebtoken';
import errorStrings from '../helpers/errorStrings';
import ResponseHelper from '../helpers/responseHelper';

const secretKey = process.env.SECRET_KEY;

/**
 * @class Authenticate User
 * @requires jsonwebtoken
 * @requires '../helpers/errorStrings'
 */
class Auth {

    /**
    * Authenticate users
    * @param {Object} request
    * @param {Object} response
    * @param {callback} next
    * @return {Object}
    */

  static authenticateUser(request, response, next) {
    try {
      const userToken = request.headers['x-access'] || request.headers.token;
      const verifiedToken = jwt.verify(userToken, secretKey);
      request.token = verifiedToken;
      return next();
    } catch (error) {
      ResponseHelper.errorUnauthorized(response, errorStrings.notAuthenticated);
    }
    
  }


}

export default Auth;
