const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require("cookie-parser");  // for later use
const app = express();
const pool = require("./utils/db.js");  // to init db

app.set("view engine", "ejs")
app.use(cookieParser());
app.use("/css", express.static(__dirname + "/static/css"));
app.use("/js", express.static(__dirname + "/static/js"));
app.use("/img", express.static(__dirname + "/static/img"));

app.get("/", (req, res) => {
    res.render(__dirname + "/private/template/home.ejs");
});

app.get("/products/woman", (req, res) => {
    res.render(__dirname + "/private/template/products_W.ejs");
});

app.get("/products/man", (req, res) => {
    res.render(__dirname + "/private/template/products_M.ejs");
});

app.get("/products/man/1", (req, res) => {
    res.render(__dirname + "/private/template/beauty_M.ejs");
});

app.get("/products/woman/1", (req, res) => {
    res.render(__dirname + "/private/template/makeup_W.ejs");
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
