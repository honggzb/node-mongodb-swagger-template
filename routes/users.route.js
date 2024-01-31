//const usersController = require('../controllers/users.controller');
const User = require('../config/models/userModel')

module.exports = function(router) {

    router.get('/', async (req, res) => {
        try {
            const users = await User.find();
            //console.log(res);
            // #swagger.tags = ['Get Users']
            // #swagger.description = 'Endpoint to get all user.' 
            res.send(users)
        } catch (error) {
            throw new Error(error)
        }
    });

    router.post('/register',async (req,res) => {
        // #swagger.tags = ['Register User']
        // #swagger.description = 'Endpoint to register a user.' 
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            };
            const userExist = await User.find({email: req.body.email})
            if(userExist.length === 0) {
                console.log(req.body.firstName);
                const CreateUser = new User({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                });
                await CreateUser.save();
                /* #swagger.responses[200] = { 
                    schema: { "$ref": "#/definitions/User" },
                    description: "User registered successfully." } */
                res.send(user)
            } else {
                // #swagger.responses[201] = { description: 'User Exists.' }
                res.send("User Exists");
            }
        } catch (error) {
             // #swagger.responses[500] = { description: 'Server Issue' }
            throw new Error(error);
        }
    });

    return router;
}


