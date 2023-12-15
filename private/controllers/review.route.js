// controllers/products.route.js
const express = require('express');
const router = express.Router();
const reviewRepo = require('../../utils/review.repository');
const {checkAuthentication} = require("../../utils/auth");

// /review

router.get("/add", checkAuthentication(["customer", "admin"]), async (req, res) => {
    if (req.user.role === "admin") {
        res.redirect("/review/list");
    } else {
        let emptyReview = {Id_order: "", product_quality: "", delivery_quality: "", delivery_speed: "", customer_service: "", recommendation: ""};
        res.render("reviews.ejs", {empty: true, r: emptyReview});
    }
});

router.get("/edit/:id", checkAuthentication("customer"), async (req, res) => {
    let reviewInfos = await reviewRepo.getReviewInfos(req.params.id);
    res.render("reviews.ejs", {empty: false, r: reviewInfos[0]});
});

router.get("/list", checkAuthentication(["customer", "admin"]), async (req, res) => {
    if (req.user.role === "admin") {
        let reviewList = await reviewRepo.getAllReviews();
        res.render("reviewList.ejs", {rList: reviewList, admin: true});
    } else {
        let reviewList = await reviewRepo.getReviewsOfUser(req.user.id);
        res.render("reviewList.ejs", {rList: reviewList, admin: false});
    }
});

router.post("/add", checkAuthentication("customer"), async (req, res) => {
    let accID = req.user.id;
    let reviewStatus = await reviewRepo.addReview(req.body.prodQ, req.body.deliQ, req.body.deliS, req.body.custS, req.body.recomm, accID, req.body.order_id);
    if (!reviewStatus) {
        res.status(400).send("Review failed");
    } else {
        res.redirect("/review/list");
    }
});

router.post("/delete", checkAuthentication("customer"), async (req, res) => {
    let accID = req.user.id;
    let reviewStatus = await reviewRepo.deleteReview(req.body.review_id, accID);
    if (!reviewStatus) {
        res.status(400).send("Review deletion failed");
    } else {
        res.send(reviewStatus);
    }
});

router.post("/edit", checkAuthentication("customer"), async (req, res) => {
    let accID = req.user.id;
    let reviewStatus = await reviewRepo.editReview(req.body.prodQ, req.body.deliQ, req.body.deliS, req.body.custS, req.body.recomm, accID, req.body.review_id);
    if (!reviewStatus) {
        res.status(400).send("Review edition failed");
    } else {
        res.redirect("/review/list");
    }
});

router.get("/list", checkAuthentication("customer"), async (req, res) => {
    let accID = req.user.id;
    let reviewList = await reviewRepo.getReviewsOfUser(accID);
    if (!reviewList) {
        res.status(400).send("Review list failed");
    } else {
        res.send(reviewList);
    }
});

module.exports = router;
