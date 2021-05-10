const express = require("express");

const config = require("../../config");
const ProductsService = require("../../services/products");
const cacheResponse = require("../../utils/cacheResponse");
const productService = new ProductsService();
const { FIVE_MINUTES_IN_SECONDS } = require("../../utils/time");

const router = express.Router();

router.get("/", async function (req, res, next) {
  cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
  const { tags } = req.query;
  try {
    const products = await productService.getProducts({ tags });
    res.render("products", { products, dev: config.dev });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
