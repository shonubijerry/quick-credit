// import modules
import Express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './server/routes';

dotenv.config();

// declare constants
const app = new Express();
const port = process.env.PORT || 3000;
console.log(port);

// declare middleware
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
// app.use('/', Express.static('UI'));

routes(app);

// listen to app port
app.listen(port, () => console.log(`App listening on port ${port}`));

export default app;
