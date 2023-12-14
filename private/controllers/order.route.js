const express = require('express');
const router = express.Router();
const orderRepo = require('../../utils/order.repository');
const {checkAuthentication} = require("../../utils/auth");

router.post("/order/addToCart", checkAuthentication("customer"), async (req, res) => {
    let accID = req.user.id;
    let orderStatus = await orderRepo.addToCart(req.body.productID, req.body.quantity, accID);
    if (!orderStatus) {
        res.status(400).send("Order failed");
    } else {
        res.redirect("/cart");
    }
});

router.get("/cart", checkAuthentication("customer"), async (req, res) => {
    let accID = req.user.id;
    let cart = await orderRepo.getCart(accID);
    res.render("cart.ejs", {cart: cart});
});

router.get("/order/checkout", checkAuthentication("customer"), async (req, res) => {
    let accID = req.user.id;
    let orderStatus = await orderRepo.checkout(accID);
    if (!orderStatus) {
        res.status(400).send("Order failed");
    } else {
        res.redirect("/cart");
    }
});

router.get("/order/delete/:id", checkAuthentication("customer"), async (req, res) => {
    let accID = req.user.id;
    let orderStatus = await orderRepo.deleteFromCart(req.params.id, accID);
    if (!orderStatus) {
        res.status(400).send("Order failed");
    } else {
        res.redirect("/cart");
    }
});

module.exports = router;
