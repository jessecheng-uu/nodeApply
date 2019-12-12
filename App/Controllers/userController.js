const User = require('../Models/user.model.js')
const commonUtil = require('../Utils/commonUtil');
const moment = require('moment');

exports.create = (req, res, next) => {
    let user = new User({
        name: req.body.name,
        password: commonUtil.cryptoStr(req.body.password),
        email: req.body.email,
        create_by: req.body.create_by,
        create_time: moment(),
    })

    user.save((err) => {
        if (err) {
            return next(err);
        }

        res.send({ result_code: 0, msg: 'success' });
    })
}

exports.fetch = function (req, res) {

    User.findById(req.params.id, function (error, info) {
        if (error) {
            res.send({ code: 500, message: "Could not find a User with id " + req.params.id })
        }
        else {
            res.send({ result_code: 0, msg: 'success' });
        }
    })
}

exports.show = (req, res) => {

    User.find((err, user) => {
        if (err) return res.send(err);

        if (!user) return res.send('No user found.');

        res.send({ result_code: 0, msg: 'success' });
    })
}

exports.update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
        if (err) return res.send(err);

        res.send({ result_code: 0, msg: 'success' });
    })
}

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if (err) res.send(err);

        res.send({ result_code: 0, msg: 'success' });
    })
}