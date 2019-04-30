import UsersController from '../controllers/usersController'
import ValidateUser from '../middleware/ValidateUser'

/**
 * @fileOverview index file for routes - it hosts all routes
 * @requires ../controllers/usersController
 * @requires ../middleware/ValidateUser
 * @param {object} app
 * @exports routes 
 */

const routes = (app) => {
    // homepage route
    app.get('/', (request, response) => response.status(200).send({
      status: 200,
      data: {
          message: 'Welcome To Quick Credit'
      }
      
    }));

    app.post('/api/v1/auth/signup', ValidateUser.validateSignup, UsersController.signup);

    //declare 404 route
    app.all('*', (req, res) => res.status(404).json({
        status: 404,
        error: 'The URL you are trying to access does not exist. Please enter a valid url',
    }));

};

export default routes;