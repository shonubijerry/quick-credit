/* eslint-disable no-console */
import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import routes from './server/routes';

/**
* @fileOverview - application entry point
* @requires - express
* @requires - body-parser
* @requires - dotenv
* @requires - cors
* @requires - ./server/routes
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

// 3rd party middleware
app.use(cors());

// At the moment GET request on '/' should show documentation inside ./index.html
app.use('/', Express.static(path.join(__dirname, './server/public/api-docs')));

app.use(bodyParser.json());
app.use('/api-docs', Express.static(path.join(__dirname, './server/public/api-docs')));

routes(app);

// listen to app port
app.listen(port, () => console.log(`App listening on port ${port}`));

export default app;
