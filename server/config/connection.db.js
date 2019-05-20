import { Pool } from 'pg';
import dotenv from 'dotenv';
import debug from 'debug';
import Config from './config';

dotenv.config();

const connectTo = Config.getDbCredentials();
debug('app/debug')(connectTo);


const pool = new Pool({ connectionString: connectTo.dataURL });

pool.on('error', (error) => {
  debug('app/connection')(error);
});

export default pool;
