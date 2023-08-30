const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
const { createUser, login } = require("./controlers/users");
const { auth } = require("./middleware/auth");
const { validationLogin, validationCreateUser } = require("./middleware/validation");
const errorHandler = require("./middleware/errorHandler");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(express.json());

app.post("/signin", validationLogin, login);
app.post("/signup", validationCreateUser, createUser);
app.use(auth);
app.use(router);

app.use(errorHandler);

app.listen(PORT);
