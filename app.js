const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((req, res, next) => {
    req.user = {
        _id: "64a97f3976b6c1bf0142c20d", // вставьте сюда _id созданного в предыдущем пункте пользователя
    };

    next();
});
app.use(express.json());
app.use(router);
app.listen(PORT);
