import UsersModel from '../model/usersModel';
import generateToken from '../helpers/token';
import errorStrings from '../helpers/errorStrings';
import ResponseHelper from '../helpers/responseHelper';


const usersModel = new UsersModel('users');

/**
* @fileOverview - class manages all users logic
* @class - usersController
* @requires - ../model/usersModel
* @requires - ../helpers/token
* @requires - ../helpers/errorStrings
* @requires - ../helpers/responseHelper
* @exports - usersController.js
* */

class UsersController {
  /**
 * Register a user
 * @param {object} req
 * @param {object} res
 */

  static async signup(req, res) {
    try {
      if (await usersModel.findUserByEmail(req.body.email)) {
        return ResponseHelper.error(res, 409, errorStrings.emailExists);
      }

      const newUser = await usersModel.signupQuery(req);
      if (!newUser) {
        throw new Error(errorStrings.serverError);
      }
      newUser.token = generateToken(newUser);

      return ResponseHelper.success(res, 201, newUser);
    } catch (error) {
      return ResponseHelper.error(res, 500, error.message);
    }
  }

  /**
     * Login a user
     * @param {object} req
     * @param {object} res
     */

  static async signin(req, res) {
    try {
      const signInResult = await usersModel.signinQuery(req);

      if (signInResult.error === 'wrong-password') {
        return ResponseHelper.error(res, 403, errorStrings.loginFailure);
      }
      if (!signInResult) {
        throw new Error(errorStrings.serverError);
      }
      signInResult.token = generateToken(signInResult);
      return ResponseHelper.success(res, 200, signInResult);
    } catch (error) {
      return ResponseHelper.error(res, 500, error.message);
    }
  }

  /**
    * Verify a user (administrator privilege is required)
    * @param {object} req
    * @param {object} res
    * @returns json object
    */

  static async verifyUser(req, res) {
    const userEmail = req.params.email;
    try {
      const foundUser = await usersModel.verifyUser(userEmail);
      switch (foundUser) {
        case 'no-user': {
          return ResponseHelper.error(res, 404, errorStrings.noUser);
        }
        case 'already-verified': {
          return ResponseHelper.error(res, 409, errorStrings.alreadyVerified);
        }
        default: {
          return ResponseHelper.success(res, 200, foundUser);
        }
      }
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
  * Get users (administrator privilege is required)
  * @param {object} req
  * @param {object} res
  * @returns json object
  */

  static async getUsers(req, res) {
    try {
      const users = await usersModel.getUsers();
      if (!users) {
        throw new Error(errorStrings.serverError);
      }
      return ResponseHelper.success(res, 200, users);
    } catch (error) {
      return ResponseHelper.error(res, 500, error.message);
    }
  }
}

export default UsersController;
