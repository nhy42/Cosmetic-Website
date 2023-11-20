// controllers/products.route.js
const express = require('express');
const router = express.Router();
const reviewRepo = require('../../utils/review.repository');

// /review

// todo get requests

router.post("/add", async (req, res) => {
    let accID = 2; // todo decode jwt
    let reviewStatus = await reviewRepo.addReview(req.query.prodQ, req.query.deliQ, req.query.deliS, req.query.custS, req.query.recomm, accID, req.query.order_id);
    if (!reviewStatus) {
        res.status(400).send("Review failed");
    } else {
        res.send(reviewStatus);
    }
});

router.post("/delete", async (req, res) => {
    let accID = 2; // todo decode jwt
    let reviewStatus = await reviewRepo.deleteReview(req.query.review_id, accID);
    if (!reviewStatus) {
        res.status(400).send("Review deletion failed");
    } else {
        res.send(reviewStatus);
    }
});

router.post("/edit", async (req, res) => {
    let accID = 2; // todo decode jwt
    let reviewStatus = await reviewRepo.editReview(req.query.prodQ, req.query.deliQ, req.query.deliS, req.query.custS, req.query.recomm, accID, req.query.review_id);
    if (!reviewStatus) {
        res.status(400).send("Review edition failed");
    } else {
        res.send(reviewStatus);
    }
});

router.get("/list", async (req, res) => {
    let accID = 2; // todo decode jwt
    let reviewList = await reviewRepo.getReviewsOfUser(accID);
    if (!reviewList) {
        res.status(400).send("Review list failed");
    } else {
        res.send(reviewList);
    }
});

module.exports = router;
