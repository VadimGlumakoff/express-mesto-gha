const Card = require("../models/card");

const BadRequestError = require("../middleware/BadRequestError");
const NotFoundError = require("../middleware/NotFoundError");
const InternalServerError = require("../middleware/InternalServerError");

const ForbiddenError = require("../middleware/ForbiddenError");

const getCard = async (req, res) => {
    try {
        const cards = await Card.find({});
        res.send(cards);
    } catch (err) {
        throw new InternalServerError("Ошибка на сервере");
    }
};

const deleteCardById = async (req, res) => {
    try {
        const card = await Card.findById(req.params.cardId);

        if (!card) {
            throw new NotFoundError("Карточка не найдена");
        }

        if (card.owner !== req.user._id) {
            throw new ForbiddenError("Невозможно удалить карточку");
        }
        await Card.findByIdAndRemove(req.params.cardId);
        res.send({ message: "Карточка удалена" });
    } catch (err) {
        if (err.name === "CastError") {
            throw new BadRequestError("Невалидные данные");
        }
        throw new InternalServerError("Ошибка на сервере");
    }
};

const createCard = async (req, res) => {
    try {
        const { name, link } = req.body;
        if (!name || !link) {
            throw new BadRequestError("Переданны неверные данные");
        }
        const card = await Card.create({ name, link, owner: req.user._id });
        if (!card) {
            throw new NotFoundError("Карточка не создана");
        }
        res.status(201).send(card);
    } catch (err) {
        if (err.name === "ValidationError") {
            throw new BadRequestError("Невалидные данные");
        }
        throw new InternalServerError("Ошибка на сервере");
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
            throw new NotFoundError("Карточка не найдена");
        }
        res.send(card);
    } catch (err) {
        if (err.name === "CastError") {
            throw new BadRequestError("Невалидные данные");
        }
        throw new InternalServerError("Ошибка на сервере");
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
            throw new NotFoundError("Карточка не найдена");
        }
        res.send(card);
    } catch (err) {
        if (err.name === "CastError") {
            throw new BadRequestError("Невалидные данные");
        }
        throw new InternalServerError("Ошибка на сервере");
    }
};

module.exports = {
    getCard, deleteCardById, createCard, likeCard, dislikeCard,
};
