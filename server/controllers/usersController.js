import usersModel from '../model/usersModel'
import generateToken from '../helpers/token';
import password from '../helpers/password';

/**
* @fileOverview - class manages all users logic
* @class - usersController
* @exports - usersController.js
* @requires - ../model/usersModel
* @requires - ../helpers/token

**/

class UsersController {

    /**
     * Register a user
     * @param {object} req 
     * @param {object} res 
     */

    static signup (req, res) {
        const newUser = usersModel.signupQuery(req);
        const currentToken = generateToken(newUser);
        process.env.CURRENT_TOKEN = currentToken;

        return res.status(201).send({
            status: 201,
            data: {
                token: currentToken,
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password
            }
        });
    }

}

export default UsersController;