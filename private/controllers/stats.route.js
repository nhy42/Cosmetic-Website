const express = require('express');
const router = express.Router();
const statsRepo = require('../../utils/stats.repository');
const {checkAuthentication} = require("../../utils/auth");

// only admin can access all those routes

// main page
router.get("/", checkAuthentication("admin"), async (req, res) => {
    res.render("stats.ejs");
});

// api paths

router.get("/api/getCounts", checkAuthentication("admin"), async (req, res) => {
    let counts = await statsRepo.getStats();
    res.send(counts);
});

module.exports = router;