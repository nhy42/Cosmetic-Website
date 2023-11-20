// controllers/products.route.js
const express = require('express');
const router = express.Router();
const reviewRepo = require('../../utils/review.repository');

// /review

router.get("/add", async (req, res) => {
    let reviewStatus = await reviewRepo.addReview(req.query.product_id, req.query.account_id, req.query.rating, req.query.comment);
    if (!reviewStatus) {
        res.status(400).send("Review failed");
    } else {
        res.send(reviewStatus);
    }
});

router.get("/delete", async (req, res) => {
    let reviewStatus = await reviewRepo.deleteReview(req.query.review_id);
    if (!reviewStatus) {
        res.status(400).send("Review deletion failed");
    } else {
        res.send(reviewStatus);
    }
});

router.get("/edit", async (req, res) => {
    let reviewStatus = await reviewRepo.editReview(req.query.review_id, req.query.rating, req.query.comment);
    if (!reviewStatus) {
        res.status(400).send("Review edition failed");
    } else {
        res.send(reviewStatus);
    }
});

router.get("/list", async (req, res) => {
    let reviewList = await reviewRepo.getReviewsOfProduct(req.query.product_id);
    if (!reviewList) {
        res.status(400).send("Review list failed");
    } else {
        res.send(reviewList);
    }
});

module.exports = router;
