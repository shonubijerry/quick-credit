import bcrypt from 'bcrypt';

/**
*   @fileOverview - password generator method
*   @exports passwordHash
**/

const passwordHash = password => bcrypt.hashSync(password, 10);

const comparePasswords = (userPassword, hashedPassword) => {
  return bcrypt.compareSync(userPassword, hashedPassword);
};

export default {
  passwordHash, comparePasswords
};
