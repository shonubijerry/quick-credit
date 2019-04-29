import passwordHelper from '../helpers/password';
import users from '../dummy/users'

/**
* @fileOverview - class manages all users data storage
* @class - usersModel
* @exports - usersModel.js
* @requires - ../helpers/password
* @requires - ../dummy/users
**/

class UsersModel {

    /**
     * Add new user to data structure
     * @param {object} req
     * @returns {object} user
     */

    static signupQuery (req) {
        const { email, firstName, lastName, address } = req.body;
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
            isAdmin: false
        }
        users.push(user);
        return user;
    }

    /**
    * check if user email already exists
    * @param {String} email
    * @return boolean
    */

    static checkRegistered(email) {
        let isFound = false;
        users.map((user, index) => {
            if (user.email === email) {
                isFound = true;
            }
        });
        return isFound;
    }

}

export default UsersModel;