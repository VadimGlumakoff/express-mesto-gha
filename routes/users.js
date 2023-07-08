const express = require("express");
const {
    getUsers, getUserById, createUser, updateUser, updateAvatar,
} = require("../controlers/users");

const router = express.Router();
router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.post("/users", createUser);

router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
