const jwt = require('jsonwebtoken');


exports.checkAuthentication = (req, res, next) => {
    var api_key = req.headers['api_key'];
    // console.log(api_key);

    if (api_key == '' && api_key == 'undefined') {
        res.send({
            code: 400,
            message: 'API_KEY is missing'
        });
    }
    else {
        if (api_key == process.env.API_KEY) {
            console.log('authentication success..');
            next();
        }
        else {
            res.send({
                code: 400,
                message: 'API_key is not provided'
            });
        }
    }
}

exports.checkToken = (req, res, next) => {
    var token = req.headers['token']; // Express headers are auto converted to lowercase

    if (token) {
        jwt.verify(token, process.env.SECREATE_KEY, (err, decoded) => {
            if (err) {
                res.send({
                    code: 400,
                    message: 'Token is not valid'
                });
            }
            else {
                req.decoded = decoded;
                console.log(req.decoded);
                console.log(req.decoded.USER_ID);
                next();
            }
        });
    } else {
        res.send({
            code: 400,
            message: 'Authentication token is not provided'
        });
    }
}

