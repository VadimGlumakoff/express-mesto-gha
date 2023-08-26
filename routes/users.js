const express = require("express");
const {
    getUsers, getUserById, updateUser, updateAvatar, getUser,
} = require("../controlers/users");

const {

    validationUpdateAvatar,
    validationUpdateUser,

} = require("../middleware/validation");

const router = express.Router();
router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.get("/users/me", getUser);
router.patch("/users/me", validationUpdateUser, updateUser);
router.patch("/users/me/avatar", validationUpdateAvatar, updateAvatar);

module.exports = router;
