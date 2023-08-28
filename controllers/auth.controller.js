const User = require('../models/User.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class authController {
    // REGISTER
    async register(req, res, next) {
        const { username, email, password } = req.body;

        // input validation
        if (!username || !email || !password)
            return res.status(400).json({ success: false, message: 'Missing username and/or email and/or password' });
        try {
            const user = await User.findOne({ username });

            // username already
            if (user) return res.status(400).json({ success: false, message: 'Username already exists error' });

            const hasdedPassword = await argon2.hash(password);
            const newUser = new User({
                username,
                email,
                password: hasdedPassword,
            });
            const getUser = await newUser.save();

            res.json({ success: true, message: 'User created successfully', getUser });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // LOGIN
    async login(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ success: false, message: 'Incorrect username and/or password' });

        try {
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ success: false, message: 'Username does not exist' });
            }
            const validPassword = await argon2.verify(user.password, password);
            if (!validPassword) {
                return res.status(404).json({ success: false, message: 'Username or Password does not correct' });
            }

            if (user && validPassword) {
                //Return token
                const accessToken = jwt.sign(
                    {
                        userId: user._id,
                        admin: user.admin,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '2h' },
                );
                return res.status(200).json({ success: true, message: 'Login successfully', user, accessToken });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = new authController();
