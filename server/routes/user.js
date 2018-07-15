
var { authenticate } = require('../middleware/authenticate');
var { User } = require('../models/user');
const _ = require('lodash');

// POST /users
module.exports = function (app) {
    app.post('/users', async (req, res) => {
        try {
            console.log(req.body)
            const body = _.pick(req.body, ['email', 'password']);
            const user = new User(body);
            await user.save();
            const token = await user.generateAuthToken();
            res.header('x-auth', token).send(user);
        } catch (e) {
            res.status(400).send(e);
        }
    });

    app.get('/users/me', authenticate, (req, res) => {
        res.send(req.user);
    });

    app.post('/users/login', async (req, res) => {
        try {
            const body = _.pick(req.body, ['email', 'password']);
            const user = await User.findByCredentials(body.email, body.password);
            const token = await user.generateAuthToken();
            res.header('x-auth', token).send(user);
        } catch (e) {
            res.status(400).send();
        }
    });

    app.delete('/users/me/token', authenticate, async (req, res) => {
        try {
            await req.user.removeToken(req.token);
            res.status(200).send();
        } catch (e) {
            res.status(400).send();
        }
    });

}
