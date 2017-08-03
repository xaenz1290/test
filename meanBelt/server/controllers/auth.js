const User = require('mongoose').model('User');
const errorHandler = require('./errors')



module.exports = {
    index(req, res) {
        User.find({})
        .then(users => res.json(users))
        .catch(errorHandler.bind(res))
    },
    login(req, res) {
        User.findOne({ name: req.body.name })
            .then((user) => {
                if (!user) return User.create(req.body)
                    .then((user) => {
                        login(req, res, user);
                    })
                else {
                    login(req, res, user);
                }
            })
            .catch(error => {
                console.log(error)
            })
    },
    logout(req, res) {
        console.log('in log out')
        req.session.destroy();
        res.clearCookie('userID')
        res.clearCookie('expiration')
        res.json(true);
    },
    getOne(req, res) {
        console.log(req.cookies.userID)
        User.findById(req.cookies.userID)
        .populate({
                path: 'items',
                model: 'Item',
                populate: {
                    path: 'postedBy',
                    model: 'User'
                }
            })
        .then(user => res.json(user))
        .catch(errorHandler.bind(res))
    },
    show(req, res) {
        User.findById(req.params.id)
        .populate({
                path: 'items',
                model: 'Item',
                populate: {
                    path: 'postedBy',
                    model: 'User'
                }
            })
        .then(user => res.json(user))
        .catch(errorHandler.bind(res))
    },
}

function login(req, res, user) {
    req.session.user = user.toObject();
    res.cookie('userID', user._id.toString());
    res.cookie('expiration', Date.now() + 86400 * 1000);

    res.json(user);
}