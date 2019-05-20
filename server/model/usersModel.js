import uuid from 'uuid';
import passwordHelper from '../helpers/password';
import Model from './model';


/**
* @fileOverview - class manages all users data storage
* @class - usersModel
* @exports - usersModel.js
* @requires - ../helpers/password
* @requires - ../dummy/users
* @requires - ../helpers/utils
* */

class UsersModel extends Model {
  /**
     * Add new user to data structure
     * @param {object} req
     * @returns {object} user
     */

  async signupQuery(req) {
    const password = passwordHelper.passwordHash(req.body.password);
    const id = uuid();
    const {
      email, firstName, lastName, address,
    } = req.body;
    try {
      const { rows } = await this.insert(
        'id, email, firstname, lastname, address, password', '$1, $2, $3, $4, $5, $6',
        [
          id, email, firstName, lastName, address, password,
        ],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
     * Find user in data structure
     * @param {object} req
     * @returns {object}
     */

  async signinQuery(req) {
    const { email, password } = req.body;
    try {
      const foundUser = await this.findUserByEmail(email);
      if (foundUser && passwordHelper.comparePasswords(password, foundUser.password)) {
        return foundUser;
      }
      return { error: 'wrong-password' };
    } catch (error) {
      throw error;
    }
  }

  /**
    * check if user email already exists
    * @param {String} email
    * @return boolean
    */

  async findUserByEmail(email) {
    try {
      const { rows } = await this.selectWhere('*', 'email=$1', [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
  * verify a specific user by email
  * @param {string} email email of the user to verify
  * @returns verified user
  */

  async verifyUser(email) {
    try {
      const foundItem = await this.findUserByEmail(email);
      if (!foundItem) {
        return 'no-user';
      } if (foundItem.status === 'verified') {
        return 'already-verified';
      }
      const { rows } = await this.update('status=$1', 'email=$2', ['verified', email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
  * Get all users
  * @returns verified user
  */

  async getUsers() {
    try {
      const { rows } = await this.select('*');
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default UsersModel;
