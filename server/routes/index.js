import UsersController from '../controllers/usersController';
import LoansController from '../controllers/loansController';
import RepaymentsController from '../controllers/repaymentsController';
import ValidateUser from '../middleware/ValidateUser';
import Auth from '../middleware/Auth';
import ValidateLoans from '../middleware/ValidateLoans';
import ResponseHelper from '../helpers/responseHelper';

/**
 * @fileOverview index file for routes - it hosts all routes
 * @requires ../controllers/usersController
 * @requires ../controllers/loansController
 * @requires ../controllers/repaymentsController
 * @requires ../middleware/ValidateUser
 * @param {object} app
 * @exports routes
 */

const routes = (app) => {
  const api = '/api/v1';
  // homepage route
  app.get('/', (req, res) => ResponseHelper.success(res, 200, { message: 'Welcome To Quick Credit' }));

  app.post(`${api}/auth/signup`, ValidateUser.validateSignup, UsersController.signup);
  app.post(`${api}/auth/signin`, ValidateUser.validateSignin, UsersController.signin);
  app.post(`${api}/loans`, Auth.authenticateUser, ValidateLoans.validateApplication, LoansController.createLoan);
  // app.get(`${api}/users/:email`, Auth.authenticateUser, UsersController.getSingleUser);
  // app.get(`${api}/users`, Auth.authenticateUser, UsersController.getUsers);

  app.get(`${api}/loans`, Auth.authenticateUser, LoansController.getLoans);
  app.get(`${api}/loans/:loanId`, Auth.authenticateAdmin, LoansController.getLoan);
  app.get(`${api}/loans/:loanId/repayments`, Auth.authenticateUser, RepaymentsController.getLoanRepayments);

  app.patch(`${api}/users/:email/verify`, Auth.authenticateAdmin, ValidateUser.validateParamEmail, UsersController.verifyUser);

  // declare 404 route
  app.all('*', (req, res) => ResponseHelper.error(res, 404, 'The URL you are trying to access does not exist. Please enter a valid url'));
};

export default routes;
