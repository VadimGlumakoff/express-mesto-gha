const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 30,
    },
    link: {
        type: String,
        required: true,

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("card", cardSchema);
