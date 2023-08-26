const { celebrate, joi } = require("celebrate", "joi");

const validationLogin = celebrate({
    body: joi.object().keys({
        email: joi.string().required().email(),
        password: joi.string().required(),
    }),
});

const validationCreateUser = celebrate({
    body: joi.object().keys({
        name: joi.string().min(2).max(30),
        about: joi.string().min(2).max(30),
        avatar: joi.string(),
        email: joi.string().required().email(),
        password: joi.string().required(),
    }),
});

const validationUpdateUser = celebrate({
    body: joi.object().keys({
        name: joi.string().min(2).max(30).required(),
        about: joi.string().min(2).max(30).required(),
    }),
});

const validationUpdateAvatar = celebrate({
    body: joi.object().keys({
        avatar: joi.string().required(),
    }),
});

const validationCreateCard = celebrate({
    body: joi.object().keys({
        name: joi.string().min(2).max(30).required(),
        link: joi.string().required(),
    }),
});

module.exports = {
    validationCreateCard,
    validationCreateUser,
    validationLogin,
    validationUpdateAvatar,
    validationUpdateUser,
};
