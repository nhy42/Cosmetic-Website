// controllers/user.route.js
const express = require('express');
const router = express.Router();
const userRepo = require('../../utils/user.repository');
const {checkAuthentication} = require("../../utils/auth");

// /user

router.get("/register", (req, res) => {
    res.send("register");  // todo send html template
});

router.get("/deleteaccount", (req, res) => {
    res.send("deleteaccount");  // todo send html template
});

router.get("/user/editaccount", (req, res) => {
    res.send("editaccount");  // todo send html template
});

router.get("/user/infos", (req, res) => {
    res.send("user");  // todo send html template
});

router.post("/register", async (req, res) => {
    let registrationStatus = await userRepo.createNewUser(req.query.mail, req.query.firstname, req.query.lastname, req.query.password, req.query.gender, req.query.date_of_birth);
    if (!registrationStatus) {
        res.status(400).res("Registration failed");
    } else {
        res.send(registrationStatus);
    }
});

router.post("/user/deleteaccount", checkAuthentication(["customer", "admin"]), async (req, res) => {
    let mail = req.user.mail;
    let deletionStatus = await userRepo.deleteUser(mail);
    if (!deletionStatus) {
        res.status(400).res("Deletion failed");
    } else {
        res.send(deletionStatus);
    }
});

router.post("/user/editaccount", checkAuthentication(["customer", "admin"]), async (req, res) => {
    let accID = req.user.id;
    let editStatus = await userRepo.editUserInfos(accID, req.query.mail, req.query.firstname, req.query.lastname, req.query.password, req.query.gender, req.query.date_of_birth);
    if (!editStatus) {
        res.status(400).send("Edit failed");
    } else {
        res.send(editStatus);
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
