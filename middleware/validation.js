const { celebrate, Joi } = require("celebrate", "Joi");

const validationLogin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

const validationCreateUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

const validationUpdateUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        about: Joi.string().min(2).max(30).required(),
    }),
});

const validationUpdateAvatar = celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().required(),
    }),
});

const validationCreateCard = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        link: Joi.string().required(),
    }),
});

module.exports = {
    validationCreateCard,
    validationCreateUser,
    validationLogin,
    validationUpdateAvatar,
    validationUpdateUser,
};
