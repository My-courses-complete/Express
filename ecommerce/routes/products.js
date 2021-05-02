const express = require("express");

const productMocks = require("../utils/mocks/products");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("products", { productMocks });
});

module.exports = router;
