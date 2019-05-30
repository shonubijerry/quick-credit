/* eslint-disable no-console */
import Express from 'express';
import cors from 'cors';
import debug from 'debug';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routes from './routes/index';
import ResponseHelper from './helpers/responseHelper';
import errorStrings from './helpers/errorStrings';

/**
* @fileOverview - application entry point
* @requires - express
* @requires - body-parser
* @requires - dotenv
* @requires - cors
* @requires - ./routes
* @exports - app.js
* */

dotenv.config();

// declare constants
const app = new Express();
const port = process.env.PORT || 3000;

// declare middleware
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// 3rd party middleware
app.use(cors('*'));

routes(app);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// At the moment GET request on '/' should show documentation
app.use('/api/v1', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// handles 500 error
app.use((err, req, res, next) => {
  if (!err) return next();
  return res.status(500).json({
    status: 500,
    error: 'OOps! Looks like something broke',
  });
});

// declare 404 route
app.all('*', (req, res) => ResponseHelper.error(res, 404, errorStrings.pageNotFound));

// listen to app port
app.listen(port, debug('app/debug')(`App listening on port ${port}`));

export default app;
