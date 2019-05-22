import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const expirationTime = 86400;

/**
* function to generate token
* @param {Object} userObject
* @returns {Object} generateToken
 */
const generateToken = userObject => jwt.sign({ user: userObject }, secretKey,
  {
    expiresIn: expirationTime,
  });

export default generateToken;
