// controllers/user.route.js
const express = require('express');
const router = express.Router();
const userRepo = require('../../utils/user.repository');
const {createJWT, checkAuthentication} = require("../../utils/auth");


// /auth

router.get("/login", (req, res) => {
    if (req.user) {
        res.redirect("/user/infos");
    } else {
        res.render("../template/user.ejs");
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

router.post("/login", async (req, res) => {
    let loginStatus = await userRepo.areValidCreds(req.body.mail, req.body.password);
    if (loginStatus && !req.user) {
        let token = createJWT(loginStatus);
        res.cookie('token', token, { maxAge: 5*60*60*1000, httpOnly: true });
        res.redirect("/");
    } else {
        if (req.user) {
            res.redirect("/");
        } else {
            res.status(400).send("Login failed");
        }
    }
});

module.exports = router;
