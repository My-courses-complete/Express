const express = require("express");

const ProductsService = require("../../services/products");

const productService = new ProductsService();

const router = express.Router();

router.get("/", async function (req, res, next) {
  const { tags } = req.query;
  try {
    const products = productService.getProducts({ tags });
    res.render("products", { products });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
