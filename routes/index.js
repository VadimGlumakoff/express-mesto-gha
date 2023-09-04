const express = require("express");
const { validationLogin, validationCreateUser } = require("../middleware/validation");
const { createUser, login } = require("../controlers/users");
const { auth } = require("../middleware/auth");

const router = express.Router();
const userRouter = require("./users");
const cardRouter = require("./cards");
const NotFoundError = require("../errors/NotFoundError");

router.post("/signin", validationLogin, login);
router.post("/signup", validationCreateUser, createUser);
router.use(auth);
router.use(userRouter);
router.use(cardRouter);
router.use((req, res, next) => {
    next(new NotFoundError("Такой страницы не существует"));
});
module.exports = router;
