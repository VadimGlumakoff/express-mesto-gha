const User = require("../models/user");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(500).send({ message: "Ошибка на сервере" });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).send({ message: "Пользователь не найден" });
        }
        res.send(user);
    } catch (err) {
        if (err.name === "CastError") {
            res.status(400).send({ message: "Невалидные данные" });
        }
        res.status(500).send({ message: "Ошибка на сервере" });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, about, avatar } = req.body;
        if (!name || !about || !avatar) {
            res.status(400).send({ message: "Переданны неверные данные" });
            return;
        }
        const user = await User.create({ name, about, avatar });
        if (!user) {
            res.status(404).send({ message: "Пользователь не создан" });
        }
        res.status(201).send(user);
    } catch (err) {
        if (err.name === "ValidationError") {
            res.status(400).send({ message: "Невалидные данные" });
        }
        res.status(500).send({ message: "Ошибка на сервере" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, about } = req.body;
        if (!name || !about) {
            res.status(400).send({ message: "Переданны неверные данные" });
            return;
        }
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, about },
            { new: true, runValidators: true },
        );

        if (!user) {
            res.status(404).send({ message: "Профиль не обновлен" });
            return;
        }
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: "Ошибка на сервере" });
    }
};

const updateAvatar = async (req, res) => {
    try {
        const { avatar } = req.body;
        if (!avatar) {
            res.status(400).send({ message: "Переданны неверные данные" });
            return;
        }
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar },
            { new: true, runValidators: true },
        );

        if (!user) {
            res.status(404).send({ message: "Профиль не обновлен" });
            return;
        }
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: "Ошибка на сервере" });
    }
};

module.exports = {
    getUsers, getUserById, createUser, updateUser, updateAvatar,
};
