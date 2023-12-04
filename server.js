const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
dotenv.config();
const cookieParser = require("cookie-parser");
const app = express();
const pool = require("./utils/db.js");
const {parseJWTMiddleware} = require("./utils/auth");

app.set("view engine", "ejs")
app.set("views", "private/template")

app.use(cookieParser());
app.use(parseJWTMiddleware);
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use("/css", express.static(__dirname + "/static/css"));
app.use("/js", express.static(__dirname + "/static/js"));
app.use("/img", express.static(__dirname + "/static/img"));


app.get("/", (req, res) => {
    res.render(__dirname + "/private/template/home.ejs");
});

app.get("/reviews", (req, res) => {
    res.render(__dirname + "/private/template/reviews.ejs");
});

app.get("/contact", (req, res) => {
    res.render(__dirname + "/private/template/contact.ejs");
});

app.get("/about", (req, res) => {
    res.render(__dirname + "/private/template/about.ejs");
});

app.get("/cart", (req, res) => {
    res.render(__dirname + "/private/template/cart.ejs");
});

app.get("/admin", (req, res) => {
    res.render(__dirname + "/private/template/admin.ejs");
});

// server start
app.listen(process.env.WEB_PORT, () => {
    // todo: init db if first use
    console.log(`Cosmetic server started. Container port : ${process.env.WEB_PORT}`);
});

app.use("/", require("./private/controllers/user.route.js"));
app.use("/products", require("./private/controllers/products.route.js"));
app.use("/review", require("./private/controllers/review.route.js"));
app.use("/", require("./private/controllers/auth.route.js"));
