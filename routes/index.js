const express = require("express");
const { validationLogin, validationCreateUser } = require("../middleware/validation");
const { createUser, login } = require("../controlers/users");
const { auth } = require("../middleware/auth");

const router = express.Router();
const userRouter = require("./users");
const cardRouter = require("./cards");

router.post("/signin", validationLogin, login);
router.post("/signup", validationCreateUser, createUser);
router.use(auth);
router.use(userRouter);
router.use(cardRouter);
router.use((req, res) => {
    res.status(404).send({ message: "Такой страницы не существует" });
});
module.exports = router;
