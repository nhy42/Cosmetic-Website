const express = require("express");
const mysql = require("mysql");  // for later use
const cookieParser = require("cookie-parser");  // for later use
const app = express();
const port = 80;

app.set("view engine", "ejs")
app.use(cookieParser());
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/img", express.static(__dirname + "/img"));

app.get("/", (req, res) => {
    res.render(__dirname + "/private/template/home.ejs");
});

app.get("/products/woman", (req, res) => {
    res.render(__dirname + "/private/template/products_W.ejs");
});

app.get("/products/man", (req, res) => {
    res.render(__dirname + "/private/template/products_M.ejs");
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


// server start
app.listen(port, () => {
    console.log(`Cosmetic server started. Container port : ${port}`);
});
