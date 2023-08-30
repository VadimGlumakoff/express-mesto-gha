const express = require("express");
const {
    getUsers, getUserById, updateUser, updateAvatar, getUser,
} = require("../controlers/users");

const {
    validationUserId,

    validationUpdateAvatar,
    validationUpdateUser,

} = require("../middleware/validation");

const router = express.Router();
router.get("/users", getUsers);

router.get("/users/me", getUser);
router.patch("/users/me", validationUpdateUser, updateUser);
router.patch("/users/me/avatar", validationUpdateAvatar, updateAvatar);
router.get("/users/:userId", validationUserId, getUserById);

module.exports = router;
