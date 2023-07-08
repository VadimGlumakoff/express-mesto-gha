const express = require("express");

const router = express.Router();
const userRouter = require("./users");
const cardRouter = require("./cards");

router.use(userRouter);
router.use(cardRouter);
router.use((req, res) => {
    res.status(404).send({ message: "Такой страницы не существует" });
});
module.exports = router;