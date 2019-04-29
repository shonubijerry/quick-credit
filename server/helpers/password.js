import bcrypt from 'bcrypt';

/**
*   @fileOverview - password generator method
*   @exports passwordHash
**/

const passwordHash = password => bcrypt.hashSync(password, 10);

export default {
  passwordHash
};
