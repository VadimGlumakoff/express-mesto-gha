const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).send({ message: "Пользователь не авторизован" });
    }
    let payload;

    try {
        payload = jwt.verify(token);
    } catch (err) {
        res.status(403).send({ message: "Пользователь не авторизован" });
    }

    req.user = payload;

    next();
};

module.exports = { auth };
