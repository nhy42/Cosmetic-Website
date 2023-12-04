// controllers/user.route.js
const express = require('express');
const router = express.Router();
const userRepo = require('../../utils/user.repository');
const {createJWT, checkAuthentication} = require("../../utils/auth");


// /auth

router.get("/login", (req, res) => {
    res.send("login");  // todo
});

router.get("/logout", (req, res) => {
    res.send("logout");  // todo
});

router.post("/login", async (req, res) => {
    let loginStatus = await userRepo.areValidCreds(req.query.mail, req.query.password);
    if (loginStatus && !req.user) {
        let token = createJWT(loginStatus);
        res.cookie('token', token, { maxAge: 5*60*60*1000, httpOnly: true });
        res.redirect("/");
    } else {
        if (req.user) {
            res.status(400).res("Already logged in");
        } else {
            res.status(400).res("Login failed");
        }
    }
});

module.exports = router;
