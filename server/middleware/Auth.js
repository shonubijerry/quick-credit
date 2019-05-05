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
    */

  static authenticateUser(request, response, next) {
    try {
      const userToken = request.headers['x-access'] || request.headers.token;
      const verifiedToken = jwt.verify(userToken, secretKey);
      request.token = verifiedToken;
      return next();
    } catch (error) {
      return ResponseHelper.error(response, 401, errorStrings.notAuthenticated);
    }
  }

  /**
     * check Admin role
     * @param {Object} request
     * @param {Object} response
     * @param {Function} next
     * @return {Object}
     */
  static authenticateAdmin(request, response, next) {
    try {
      const token = request.headers['x-access'] || request.headers.token;
      const verifiedToken = jwt.verify(token, secretKey);
      request.token = verifiedToken;
      if (verifiedToken.user.isAdmin === false) {
        return ResponseHelper.error(response, 403, errorStrings.notAllowed);
      } return next();
    } catch (error) {
      return ResponseHelper.error(response, 401, errorStrings.notAuthenticated);
    }
  }
}

export default Auth;
