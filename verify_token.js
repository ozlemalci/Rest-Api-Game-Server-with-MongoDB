const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    next();
    
 
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    console.log(token);
    if (token) {
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if (err) {
                res.render('error', {error: {status: 'the token is wrong'}, message: 'Fail Token'});
            } else {
                req.decode = decoded;
                next();
            }
        });
    } else {
        res.render('error', {error: {status: 'You can not see this page without logging in.'}, message: 'No Token'});
    }
};