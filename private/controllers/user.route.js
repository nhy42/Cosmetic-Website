// controllers/user.route.js
const express = require('express');
const router = express.Router();
const userRepo = require('../../utils/user.repository');
const {checkAuthentication} = require("../../utils/auth");
// import formatdate from "../../utils/formatdate";
const formatdate = require("../../utils/date.js");
const {areValidCreds} = require("../../utils/user.repository");

// /user

router.get("/register", (req, res) => {
    res.render("../template/create-account.ejs");
});

router.get("/deleteaccount", (req, res) => {
    res.render("../template/user-delete.ejs");
});

router.get("/user/infos", checkAuthentication(["customer", "admin"]),async (req, res) => {
    let userInfos = await userRepo.getUserInfos(req.user.id);
    userInfos[0].date_of_birth = formatdate.formatDate(userInfos[0].date_of_birth);
    res.render("../template/user-info.ejs", {u: userInfos[0]});
});

router.post("/register", async (req, res) => {
    let registrationStatus = await userRepo.createNewUser(req.body.mail, req.body.firstname, req.body.lastname, req.body.password, req.body.gender, req.body.date_of_birth);
    if (!registrationStatus) {
        res.status(400).res("Registration failed");
    } else {
        res.redirect("/login");
    }
});

router.post("/user/deleteaccount", checkAuthentication(["customer", "admin"]), async (req, res) => {
    let mail = req.user.mail;
    let deletionStatus = await userRepo.deleteUser(mail);
    if (!deletionStatus) {
        res.status(400).res("Deletion failed");
    } else {
        res.clearCookie('token');
        res.redirect("/");
    }
});

router.post("/user/editaccount", checkAuthentication(["customer", "admin"]), async (req, res) => {
    let accID = req.user.id;
    let pass = req.body.password;
    pass
    let editStatus = await userRepo.editUserInfos(accID, req.body.mail, req.body.firstname, req.body.lastname, pass, req.body.gender, req.body.date_of_birth);
    if (!editStatus) {
        res.status(400).send("Edit failed");
    } else {
        res.redirect("/user/infos");
    }
});

router.post("/user/infos", checkAuthentication(["customer", "admin"]), async (req, res) => {
    let accID = req.user.id;
    let infos = await userRepo.getUserInfos(accID);
    if (!infos) {
        res.status(400).send("Get infos failed");
    } else {
        res.send(infos);
    }
});

module.exports = router;
