const usersRepo = require("./user.repository.js");
// use jwt
const jwt = require('jsonwebtoken');

module.exports = {
    checkAuthentication(role) {  // role can be a list or a string
        return (req, res, next) => {
            if (role) {
                if (!req.user) {
                    return res.redirect("/login");
                }
                if (Array.isArray(role)) {
                    if (role.includes(req.user.role)) {
                        return next();
                    } else {
                        return res.status(401).end("401 Unautorized (bad user level)");
                    }
                } else {
                    if (role === req.user.role) {
                        return next();
                    } else {
                        return res.status(401).end("401 Unautorized (bad user level)");
                    }
                }
            } else { // No special role needed for page -> next middleware
                return next();
            }
        }
    },
    createJWT(user) {
        return jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '5h'});
    },
    parseJWTMiddleware(req, res, next) {
        let token = req.cookies.token;
        req.token = null;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                if (!err) {
                    req.user = decoded.user;
                } else {
                    console.log(err);
                }
            });
        }
        next();
    }
};
