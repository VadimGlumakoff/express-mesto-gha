const mongoose = require("mongoose");
const isUrl = require("validator/lib/isURL");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 30,
        default: "Жак Ив Кусто",
    },
    about: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        default: "Исследователь",

    },
    avatar: {
        type: String,
        default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
        required: true,
        validate: {
            validator: (v) => isUrl(v),
            message: "Неправильный url адрес",
        },
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (v) => isEmail(v),
            message: "Неправильный формат почты",
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
    },

});

module.exports = mongoose.model("user", userSchema);
