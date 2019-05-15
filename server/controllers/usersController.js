import usersModel from '../model/usersModel';
import generateToken from '../helpers/token';
import errorStrings from '../helpers/errorStrings';
import ResponseHelper from '../helpers/responseHelper';

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

  static signup(req, res) {
    if (usersModel.checkRegistered(req.body.email)) {
      return ResponseHelper.error(res, 409, errorStrings.emailExists);
    }

    const newUser = usersModel.signupQuery(req);
    const currentToken = generateToken(newUser);

    return res.status(201).json({
      status: 201,
      data: {
        token: currentToken,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  }

  /**
     * Login a user
     * @param {object} req
     * @param {object} res
     */

  static signin(req, res) {
    const singinResult = usersModel.signinQuery(req);

    if (singinResult.error === 'wrong-password') {
      return ResponseHelper.error(res, 403, errorStrings.loginFailure);
    }
    const currentToken = generateToken(singinResult);

    return res.status(200).json({
      status: 200,
      data: {
        token: currentToken,
        id: singinResult.id,
        firstName: singinResult.firstName,
        lastName: singinResult.lastName,
        address: singinResult.address,
        email: singinResult.email,
        status: singinResult.status,
        isAdmin: singinResult.isAdmin,
      },
    });
  }

  /**
    * Verify a user (administrator privilege is required)
    * @param {object} req
    * @param {object} res
    * @returns json object
    */

  static verifyUser(req, res) {
    const userEmail = req.params.email;
    const foundUser = usersModel.verifyUser(userEmail);
    if (foundUser === 'no-user') {
      return ResponseHelper.error(res, 404, errorStrings.noUser);
    }
    if (foundUser === 'already-verified') {
      return ResponseHelper.error(res, 409, errorStrings.alreadyVerified);
    }
    return ResponseHelper.success(res, 200, foundUser);
  }

  /**
  * Get users (administrator privilege is required)
  * @param {object} req
  * @param {object} res
  * @returns json object
  */

  static getUsers(req, res) {
    return ResponseHelper.success(res, 200, usersModel.getUsers());
  }
}

export default UsersController;
