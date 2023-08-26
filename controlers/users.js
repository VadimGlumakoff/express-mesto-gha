const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ConflictError = require("../middleware/ConflictError");
const BadRequestError = require("../middleware/BadRequestError");
const NotFoundError = require("../middleware/NotFoundError");
const AuthError = require("../middleware/AuthError");
const InternalServerError = require("../middleware/InternalServerError");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        throw new InternalServerError();
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.send(user);
    } catch (err) {
        throw new AuthError("Пользователь не найденr");
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            throw new NotFoundError("Пользователь не найден");
        }
        res.send(user);
    } catch (err) {
        if (err.name === "CastError") {
            throw new BadRequestError("Невалидные данные");
        }
        throw new InternalServerError("Ошибка на сервере");
    }
};

const createUser = async (req, res) => {
    try {
        const {
            name, about, avatar, email,
            password,
        } = req.body;

        const hashPassword = bcrypt.hash(password, 10);

        const user = await User.create({
            name, about, avatar, password: hashPassword, email,
        });
        if (!user) {
            throw new NotFoundError("Пользователь не создан");
        }

        res.status(201).send(user);
    } catch (err) {
        if (err.name === "ValidationError") {
            throw new BadRequestError("Невалидные данные");
        }

        if (err.code === 11000) {
            throw new ConflictError("Пользователь с таким email уже существует");
        }
        throw new InternalServerError("Ошибка на сервере");
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, about } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, about },
            { new: true, runValidators: true },
        );

        if (!user) {
            throw new NotFoundError("Профиль не обновлен");
        }
        res.send(user);
    } catch (err) {
        throw new InternalServerError("Ошибка на сервере");
    }
};

const updateAvatar = async (req, res) => {
    try {
        const { avatar } = req.body;
        if (!avatar) {
            throw new BadRequestError("Переданны неверные данные");
        }
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar },
            { new: true, runValidators: true },
        );

        if (!user) {
            throw new NotFoundError("Профиль не обновлен");
        }
        res.send(user);
    } catch (err) {
        throw new InternalServerError("Ошибка на сервере");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new AuthError("Пользователь не найден");
        }
        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new AuthError("Введен неверный пароль");
        }
        const token = jwt.sign(
            { _id: user._id },
            "some-secret-key",
            { expiresIn: "7d" },
        );

        res.send(token);
    } catch (err) {
        throw new InternalServerError("Ошибка на сервере");
    }
};

module.exports = {
    getUsers, getUserById, createUser, updateUser, updateAvatar, login, getUser,
};
