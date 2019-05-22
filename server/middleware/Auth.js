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
      request.token = Auth.verifyToken(request.headers.token);
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
      request.token = Auth.verifyToken(request.headers.token);
      if (request.token.user.isadmin === false) {
        return ResponseHelper.error(response, 403, errorStrings.notAllowed);
      } return next();
    } catch (error) {
      return ResponseHelper.error(response, 401, errorStrings.notAuthenticated);
    }
  }


  /**
 * Verify a token by using a secret key and a public key.
 * @param {Object} token
 * @return {Object} return verified token
 */

  static verifyToken(token) {
    return jwt.verify(token, secretKey);
  }
}

export default Auth;
