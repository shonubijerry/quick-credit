import bcrypt from 'bcrypt';


const passwordHash = password => bcrypt.hashSync(password, 10);

export default {
  passwordHash
};
