const jwt = require("jsonwebtoken");
const AuthError = require("../errors/AuthError");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        if (!token) {
            throw new AuthError("Пользователь не авторизован");
        }

        req.user = jwt.verify(token, "some-secret-key");
        next();
    } catch (err) {
        next(new AuthError("Пользователь не авторизован"));
    }
};

module.exports = { auth };
