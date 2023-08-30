const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        if (!token) {
            res.status(401).send({ message: "Пользователь не авторизован" });
        }

        req.user = jwt.verify(token, "some-secret-key");
        next();
    } catch (err) {
        res.status(401).send({ message: "Пользователь не авторизован" });
    }
};

module.exports = { auth };
