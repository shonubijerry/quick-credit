import UsersController from '../controllers/usersController';
import LoansController from '../controllers/loansController';
import RepaymentsController from '../controllers/repaymentsController';
import ValidateUser from '../middleware/ValidateUser';
import Auth from '../middleware/Auth';
import ValidateLoans from '../middleware/ValidateLoans';

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

  app.post(`${api}/auth/signup`, ValidateUser.validateSignupFormData, UsersController.signup);
  app.post(`${api}/auth/signin`, ValidateUser.validateSigninFormData, UsersController.signin);
  app.post(`${api}/loans`, Auth.authenticateUser, ValidateUser.checkVerified, ValidateLoans.validateApplication, LoansController.createLoan);
  app.post(`${api}/loans/:loanId/repayment`, Auth.authenticateAdmin, ValidateLoans.validateRepayment, RepaymentsController.createRepayment);

  app.get(`${api}/loans/:loanId`, Auth.authenticateAdmin, ValidateLoans.validateLoanId, LoansController.getLoan);
  app.get(`${api}/loans`, Auth.authenticateUser, ValidateUser.checkVerified, LoansController.getLoans);
  app.get(`${api}/loans/:loanId/repayments`, Auth.authenticateUser, ValidateUser.checkVerified, ValidateLoans.validateLoanId, RepaymentsController.getLoanRepayments);
  app.get(`${api}/users`, Auth.authenticateAdmin, ValidateUser.validateUsersEndpointQuery, UsersController.getUsers);

  app.patch(`${api}/users/:email/verify`, Auth.authenticateAdmin, ValidateUser.validateParamEmail, UsersController.verifyUser);
  app.patch(`${api}/loans/:loanId`, Auth.authenticateAdmin, ValidateLoans.validateApproveLoan, LoansController.approveRejectLoan);
};

export default routes;
