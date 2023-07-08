const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
    family: 4,
});
app.use(express.json());
app.use((req, res, next) => {
    req.user = {
        _id: "649c9c820f16bead4c3ee4b3", // вставьте сюда _id созданного в предыдущем пункте пользователя
    };

    next();
});
app.use(router);
app.listen(PORT);
