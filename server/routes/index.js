import UsersController from '../controllers/usersController'
import LoansController from '../controllers/loansController'
import RepaymentsController from '../controllers/repaymentsController'
import ValidateUser from '../middleware/ValidateUser'
import Auth from '../middleware/Auth'
import ValidateLoans from '../middleware/ValidateLoans';
import ResponseHelper from '../helpers/responseHelper';

/**
 * @fileOverview index file for routes - it hosts all routes
 * @requires ../controllers/usersController
 * @requires ../controllers/loansController
 * @requires ../middleware/ValidateUser
 * @param {object} app
 * @exports routes 
 */

const routes = (app) => {
    // homepage route
    app.get('/', (req, res) => 
        ResponseHelper.successOk(res, 'Welcome To Quick Credit'));

    app.post('/api/v1/auth/signup', ValidateUser.validateSignup, UsersController.signup);
    app.post('/api/v1/auth/signin', ValidateUser.validateSignin, UsersController.signin);
    app.post('/api/v1/loans', Auth.authenticateUser, ValidateLoans.validateApplication, LoansController.createLoan);

    app.get('/api/v1/loans', Auth.authenticateUser, LoansController.getUserLoans);
    app.get('/api/v1/loans/:loanId/repayments', Auth.authenticateUser, RepaymentsController.getLoanRepayments);

    //declare 404 route
    app.all('*', (req, res) => 
        ResponseHelper.errorNotFound(res, 'The URL you are trying to access does not exist. Please enter a valid url'));

};

export default routes;