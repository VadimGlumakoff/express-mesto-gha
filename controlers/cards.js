const Card = require("../models/card");

const getCard = async (req, res) => {
    try {
        const cards = await Card.find({});
        res.send(cards);
    } catch (err) {
        res.status(500).send({ message: "Ошибка на сервере" });
    }
};

const deleteCardById = async (req, res) => {
    try {
        const card = await Card.findById(req.params.cardId);
        if (!card) {
            res.status(404).send({ message: "Карточка не найдена" });
        }
        await Card.findByIdAndRemove(req.params.cardId);
        res.send({ message: "Карточка удалена" });
    } catch (err) {
        res.status(500).send({ message: "Ошибка на сервере" });
    }
};

const createCard = async (req, res) => {
    try {
        const { name, link } = req.body;
        if (!name || !link) {
            res.status(404).send({ message: "Переданны неверные данные" });
            return;
        }
        const card = await Card.create({ name, link, owner: req.user._id });
        if (!card) {
            res.status(404).send({ message: "Карточка не создана" });
        }
        res.status(201).send(card);
    } catch (err) {
        res.status(500).send({ message: "Ошибка на сервере" });
    }
};

const likeCard = async (req, res) => {
    try {
        const card = await Card.findByIdAndUpdate(
            req.params.cardId,
            { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
            { new: true },
        );
        if (!card) {
            res.status(404).send({ message: "Карточка не найдена" });
        }
        res.send(card);
    } catch (err) {
        res.status(500).send({ message: "Ошибка на сервере" });
    }
};

const dislikeCard = async (req, res) => {
    try {
        const card = await Card.findByIdAndUpdate(
            req.params.cardId,
            { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
            { new: true },
        );
        if (!card) {
            res.status(404).send({ message: "Карточка не найдена" });
        }
        res.send(card);
    } catch (err) {
        res.status(500).send({ message: "Ошибка на сервере" });
    }
};

module.exports = {
    getCard, deleteCardById, createCard, likeCard, dislikeCard,
};
