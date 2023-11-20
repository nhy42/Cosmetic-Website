const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
dotenv.config();
const cookieParser = require("cookie-parser");  // for later use
const app = express();
const pool = require("./utils/db.js");  // to init db

app.set("view engine", "ejs")
app.set("views", "private/template")

app.use(cookieParser());
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

// server start
app.listen(process.env.WEB_PORT, () => {
    // todo: init db if first use
    console.log(`Cosmetic server started. Container port : ${process.env.WEB_PORT}`);
});
