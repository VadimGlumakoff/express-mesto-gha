const express = require("express");

const router = express.Router();

const {
    getCard, deleteCardById, createCard, likeCard, dislikeCard,
} = require("../controlers/cards");

const {
    validationCreateCard,
} = require("../middleware/validation");

router.get("/cards", getCard);
router.post("/cards", validationCreateCard, createCard);
router.delete("/cards/:cardId", deleteCardById);

router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
