const express = require("express");

const config = require("../../config");
const ProductsService = require("../../services/products");

const productService = new ProductsService();

const router = express.Router();

router.get("/", async function (req, res, next) {
  const { tags } = req.query;
  try {
    const products = await productService.getProducts({ tags });
    res.render("products", { products, dev: config.dev });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
