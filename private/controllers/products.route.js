// controllers/products.route.js
const express = require('express');
const router = express.Router();
const productsRepo = require('../../utils/products.repository');
const {checkAuthentication} = require("../../utils/auth");

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

router.get("/delete/:id", checkAuthentication("admin"), async (req, res) => {
    res.render("delete-product.ejs", {pID: req.params.id});
});

router.get("/adminProductList", checkAuthentication("admin"), async (req, res) => {
    res.render("adminProductList.ejs", {pList: await productsRepo.getAllProducts()});
});

router.get("/edit/:id", checkAuthentication("admin"), async (req, res) => {
    let productInfos = await productsRepo.getProductInfos(req.params.id);
    res.render("editProduct.ejs", {isNew: false, p: productInfos[0]});
});

router.get("/new", checkAuthentication("admin"), (req, res) => {
    let empty = {name_product: "", product_price: "", description: "", vegan: "", image: "", Id_category: ""};
    res.render("editProduct.ejs", {isNew: true, p: empty});
});

router.post("/edit/:id", checkAuthentication("admin"), async (req, res) => {
    let creationResult = await productsRepo.editProduct(req.params.id, req.body.name, req.body.price, req.body.desc, req.body.vegan, req.body.image, req.body.cat);
    if (!creationResult) {
        res.status(400).send("Product edition failed.");
    }
    else {
        res.redirect("/products/adminProductList");
    }
});

router.post("/new", checkAuthentication("admin"), async (req, res) => {
    let creationResult = await productsRepo.createProduct(req.body.name, req.body.price, req.body.desc, req.body.vegan, req.body.image, req.body.cat);
    if (!creationResult) {
        res.status(400).send("Product creation failed.");
    }
    else {
        res.redirect("/products/adminProductList");
    }
});

router.post("/delete/:id", checkAuthentication("admin"), async (req, res) => {
    let creationResult = await productsRepo.deleteProduct(req.params.id);
    if (!creationResult) {
        res.status(400).send("Product deletion failed.");
    } else {
        res.redirect("/products/adminProductList");
    }
});

module.exports = router;
