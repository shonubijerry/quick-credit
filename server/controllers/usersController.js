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
      return res.status(406).send({
        status: 406,
        error: errorStrings.emailExists,
      });
    }

    const newUser = usersModel.signupQuery(req);
    const currentToken = generateToken(newUser);
    process.env.CURRENT_TOKEN = currentToken;

    return res.status(201).send({
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

    if (!singinResult.error) {
      const currentToken = generateToken(singinResult);
      process.env.CURRENT_TOKEN = currentToken;
      return res.status(200).send({
        status: 200,
        data: {
          token: currentToken,
          id: singinResult.id,
          firstName: singinResult.firstName,
          lastName: singinResult.lastName,
          email: singinResult.email,
          isAdmin: singinResult.isAdmin,
        },
      });
    }
    if (singinResult.error === 'wrong-password') {
      return ResponseHelper.errorResponse(res, errorStrings.loginFailure);
    }
    return ResponseHelper.errorResponse(res, errorStrings.emailNotExist);
  }
}

export default UsersController;
