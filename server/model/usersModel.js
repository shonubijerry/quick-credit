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
     * Find user in data structure
     * @param {object} req
     * @returns {object} 
     */

    static signinQuery (req) {
        const { email, password } = req.body;
        const findUser = users.find(user => user.email === email);
        if(findUser){
            if(passwordHelper.comparePasswords(password, findUser.password)){
                return findUser;
            }
            return {error: 'wrong-password'};
        }
        return {error: 'user-not-exist' };           

    }

    /**
    * check if user email already exists
    * @param {String} email
    * @return boolean
    */

    static checkRegistered (email) {
        let isFound = false;
        users.map((user) => {
            if (user.email === email) {
                isFound = true;
            }
        });
        return isFound;
    }

}

export default UsersModel;