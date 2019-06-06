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

  async signupQuery(formdata) {
    const password = passwordHelper.passwordHash(formdata.password);
    const id = uuid();
    const {
      email, firstName, lastName, address,
    } = formdata;
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

  async signinQuery({ email, password }) {
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
    * Find a user by email
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
    * Find a user by id
    * @param {String} id
    * @return boolean
    */

  async findUserById(id) {
    try {
      const { rows } = await this.selectWhere('*', 'id=$1', [id]);
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

  async getUsers(filter) {
    let users = [];
    try {
      if (!filter) {
        users = await this.select('*');
      } else if (filter === 'verified' || filter === 'unverified') {
        users = await this.selectWhere('*', 'status=$1', [filter]);
      }
      return users.rows;
    } catch (error) {
      throw error;
    }
  }
}

export default UsersModel;
