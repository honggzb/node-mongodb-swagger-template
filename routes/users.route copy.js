/**
 * @Swagger
 * tags:
 *   name: Users
 *   description: The books managing API
 * /users/register:
 *   post:
 *      summary: Create a new User
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *      parameters:
 *        - in: path
 *            name: User
 *            description: User data
 *            schemas:
 *             users:
 *              type: object
 *              required: true
 *                  - firstName
 *                  - lastName
 *                  - email
 *                  - password
 *              properties:
 *                  firstName:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: Navin
 *                  lastName:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: Balla
 *                   email:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: Navin@gmail.com
 *                   password:
 *                      type: string
 *                      minLength: 6
 *                      maxLength: 45
 *                      example: 124145asfs
 *      responses:
 *         '200':
 *              description: Resource added successfully
 *         '500':
 *              description: Internal server error 
 *         '400':
 *              description: Bad Request      
 */
//const usersController = require('../controllers/users.controller');
const User = require('../config/models/userModel')

module.exports = function(router) {

    router.get('/', async (req, res) => {
        try {
            const users = await User.find();
            //console.log(res);
            res.send(users)
        } catch (error) {
            throw new Error(error)
        }
    });

    router.post('/register',async (req,res) => {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            };
            const userExist = await User.find({email: data.email})
            if(userExist.length === 0) {
                console.log(req.body.firstName);
                const CreateUser = new User({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                });
                await CreateUser.save();
                res.send(user)
            } else {
                res.send("User Exists");
            }
        } catch (error) {
            throw new Error(error);
        }
    });

    return router;
}


