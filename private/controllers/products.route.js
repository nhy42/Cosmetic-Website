// controllers/products.route.js
const express = require('express');
const router = express.Router();
const productsRepo = require('../../utils/products.repository');

// /products

router.get("/woman", async (req, res) => {
    let productList = await productsRepo.getProductOfCategory(1);
    res.render("productList.ejs", {cat: 1, pList: productList});
});

router.get("/man", async (req, res) => {
    let productList = await productsRepo.getProductOfCategory(2);
    res.render("productList.ejs", {cat: 2, pList: productList});
});

router.get("/man/:prodID", async (req, res) => {
    let productInfos = await productsRepo.getProductInfos(req.params.prodID);
    res.render("productInfo.ejs", {cat: 2, prod: productInfos[0]});
});

router.get("/woman/:prodID", async (req, res) => {
    let productInfos = await productsRepo.getProductInfos(req.params.prodID);
    res.render("productInfo.ejs", {cat: 1, prod: productInfos[0]});
});

// ADMIN

router.get("/delete/:id", (req, res) => {
    // todo: auth
    // todo: template
    res.send("delete");
});

router.get("/adminProductList", (req, res) => {
    // todo: auth
    // todo: template
    res.send("adminProductList");
});

router.get("/edit/:id", (req, res) => {
    // todo: auth
    // todo: template
    res.send("edit");
});

router.post("/edit/:id", async (req, res) => {
    // todo: admin auth
    let creationResult = await productsRepo.editProduct(req.params.id, req.query.name, req.query.price, req.query.desc, req.query.vegan, req.query.image, req.query.cat);
    if (!creationResult) {
        res.status(400).send("Product edition failed.");
    }
    else {
        res.redirect("/products/adminProductList");
    }
});

router.post("/new", async (req, res) => {
    // todo: admin auth
    let creationResult = await productsRepo.createProduct(req.query.name, req.query.price, req.query.desc, req.query.vegan, req.query.image, req.query.cat);
    if (!creationResult) {
        res.status(400).send("Product creation failed.");
    }
    else {
        res.redirect("/products/adminProductList");
    }
});

router.post("/delete/:id", async (req, res) => {
    // todo: admin auth
    let creationResult = await productsRepo.deleteProduct(req.params.id);
    if (!creationResult) {
        res.status(400).send("Product deletion failed.");
    } else {
        res.redirect("/products/adminProductList");
    }
});

module.exports = router;
