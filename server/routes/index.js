import UsersController from '../controllers/usersController';
import LoansController from '../controllers/loansController';
import RepaymentsController from '../controllers/repaymentsController';
import ValidateUser from '../middleware/ValidateUser';
import Auth from '../middleware/Auth';
import ValidateLoans from '../middleware/ValidateLoans';
import ResponseHelper from '../helpers/responseHelper';
import errorStrings from '../helpers/errorStrings';

/**
 * @fileOverview This file manages all routes in the application
 * @requires ../controllers/usersController
 * @requires ../controllers/loansController
 * @requires ../controllers/repaymentsController
 * @requires ../middleware/ValidateUser
 * @requires ../middleware/Auth
 * @requires ../middleware/ValidateLoans
 * @requires ../helpers/responseHelper
 * @requires ../helpers/errorStrings
 * @param {object} app
 * @exports routes.js
 */

const routes = (app) => {
  const api = '/api/v1';
  // homepage route
  app.get('/', (req, res) => ResponseHelper.success(res, 200, { message: 'Welcome To Quick Credit' }));

  app.post(`${api}/auth/signup`, ValidateUser.validateSignup, UsersController.signup);
  app.post(`${api}/auth/signin`, ValidateUser.validateSignin, UsersController.signin);
  app.post(`${api}/loans`, Auth.authenticateUser, ValidateLoans.validateApplication, LoansController.createLoan);
  app.post(`${api}/loans/:loanId/repayment`, Auth.authenticateAdmin, ValidateLoans.validateRepayment, RepaymentsController.createRepayment);

  app.get(`${api}/loans/:loanId`, Auth.authenticateAdmin, LoansController.getLoan);
  app.get(`${api}/loans`, Auth.authenticateUser, LoansController.getLoans);
  app.get(`${api}/loans/:loanId/repayments`, Auth.authenticateUser, RepaymentsController.getLoanRepayments);

  app.patch(`${api}/users/:email/verify`, Auth.authenticateAdmin, ValidateUser.validateParamEmail, UsersController.verifyUser);
  app.patch(`${api}/loans/:loanId`, Auth.authenticateAdmin, ValidateLoans.validateApproveLoan, LoansController.approveLoan);

  // declare 404 route
  app.all('*', (req, res) => ResponseHelper.error(res, 404, errorStrings.pageNotFound));
};

export default routes;
