import usersModel from '../model/usersModel'
import generateToken from '../helpers/token';
import errorStrings from '../helpers/errorStrings';

/**
* @fileOverview - class manages all users logic
* @class - usersController
* @requires - ../model/usersModel
* @requires - ../helpers/token
* @requires - ../helpers/errorStrings
* @exports - usersController.js
**/

class UsersController {

    /**
     * Register a user
     * @param {object} req 
     * @param {object} res
     */

    static signup (req, res) {

        if(usersModel.checkRegistered(req.body.email)){
            return res.status(406).send({
                status: 406,
                error: errorStrings.emailExists
            });
        }

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
                email: newUser.email
            }
        });

    }



}

export default UsersController;