

/**
 * @fileOverview index file for routes - it hosts all routes
 * @param {object} app
 * @exports routes What is exported
 */

const routes = (app) => {
    // homepage route
    app.get('/', (request, response) => response.status(200).send({
      status: 200,
      data: {
          message: 'Welcome To Quick Credit'
      }
      
    }));

    // declare 404 route
    app.all('*', (req, res) => res.status(404).json({
        status: 404,
        error: 'The URL you are trying to access does not exist. Please enter a valid url',
    }));
};

export default routes;