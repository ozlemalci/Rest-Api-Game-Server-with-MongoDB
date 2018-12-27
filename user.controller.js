const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');//şifreyi şifrelemek için kullanılıyor
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const profile = require('../models/profile.model.js').default;

//user için sign up şifreyi şifreleyerek kaydediyor //kullanıcı kayıt işlemi
exports.create = (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            const user = new User({
                email: req.body.email,
                password: hash,
            });

            user.save()
                .then(data => {
                    res.status(200).json({
                        success: 'New user has been created'
                    });
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })
};


exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        });
};


exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "Not Found" + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};



exports.update = (req, res) => {

    if (!req.body.email) {
        return res.status(400).send({
            message: "User content can not be empty"
        });

    }
    User.findByIdAndUpdate(req.params.userId, {

        email: req.body.email
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then(() => {
            res.send({ message: "Users deleted successfully!" });
        }).catch(err => {
            return res.status(500).send({
                message: "Could not delete users"
            });
        });
};


exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.userId
            });
        });
};

//login ile token üretildi
exports.login = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .exec()
        .then(function (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign({
                        email: user.email,
                        _id: user._id
                    },
                        req.app.get('api_secret_key'),
                        {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        success: 'Welcome to the JWT Auth',
                        token: JWTToken
                    });
                }
                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};


exports.profile = (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
}