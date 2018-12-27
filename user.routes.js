const bcrypt = require('bcrypt'); //require modül başvurusu yapıyor.
const jwt=require('jsonwebtoken');


let verifyToken = (req, res, next) => {
    

    let token = '';
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { 
       
        token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if (err) {

                res.status(500).send({
                    message: "Error token"
                });
            } else {
                req.decode = decoded;
                next();
            }
        });
    } else {
        res.status(500).send({
            message: "Error retrieving token with id " + req.params.userId
        });  
    }
};

module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
      
    app.post('/users', users.create);
    app.get('/users', users.findAll);
    app.get('/users/:userId', users.findOne);
    app.put('/users/:userId', users.update);
    app.delete('/users/deleteAll', users.deleteAll);
    app.delete('/users/:userId', users.delete);
    app.post('/login', users.login);
    //token verify
    app.get('/users/profile/:userId', verifyToken,users.profile);  


}
