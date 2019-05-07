import passwordHelper from '../helpers/password';
import users from '../dummy/users';
import Utils from '../helpers/utils';

/**
* @fileOverview - class manages all users data storage
* @class - usersModel
* @exports - usersModel.js
* @requires - ../helpers/password
* @requires - ../dummy/users
* @requires - ../helpers/utils
* */

class UsersModel {
  /**
     * Add new user to data structure
     * @param {object} req
     * @returns {object} user
     */

  static signupQuery(req) {
    const {
      email, firstName, lastName, address,
    } = req.body;
    let { password } = req.body;
    password = passwordHelper.passwordHash(password);
    // console.log(password);
    const user = {
      email,
      firstName,
      lastName,
      address,
      password,
      id: users.length + 1,
      status: 'unverified',
      isAdmin: false,
    };
    users.push(user);
    return user;
  }

  /**
     * Find user in data structure
     * @param {object} req
     * @returns {object}
     */

  static signinQuery(req) {
    const { email, password } = req.body;
    const foundUser = users.find(user => user.email === email);
    if (foundUser) {
      if (passwordHelper.comparePasswords(password, foundUser.password)) {
        return foundUser;
      }
      return { error: 'wrong-password' };
    }
    return { error: 'user-not-exist' };
  }

  /**
    * check if user email already exists
    * @param {String} email
    * @return boolean
    */

  static checkRegistered(email) {
    const isFound = users.find(user => user.email === email);
    if (isFound) {
      return true;
    }
    return false;
  }

  /**
  * verify a specific user by email
  * @param {string} email email of the user to verify
  * @returns verified user
  */

  static verifyUser(email) {
    let info;
    const foundItem = Utils.updateItems(users, 'email', email);
    if (foundItem === false) {
      info = 'no-user';
    } else if (foundItem.item.status === 'verified') {
      info = 'already-verified';
    } else {
      foundItem.item.status = 'verified';
      users.splice(foundItem.index, 1, foundItem.item);
      delete foundItem.item.isAdmin;
      delete foundItem.item.id;
      info = foundItem.item;
    }

    return info;
  }

  /**
  * Get all users
  * @returns verified user
  */

  static getUsers() {
    const usersArray = [];
    users.forEach((user) => {
      const addUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        status: user.status,
        isAdmin: user.isAdmin,
      };
      usersArray.push(addUser);
    });
    return usersArray;
  }
}

export default UsersModel;
