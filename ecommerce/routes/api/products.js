const express = require("express");

const ProductsService = require("../../services/products");

const productService = new ProductsService();
const router = express.Router();

router.get("/", async function (req, res, next) {
  const { tags } = req.query;
  try {
    const getProducts = await productService.getProducts({ tags });

    res.status(200).json({
      data: getProducts,
      message: "products listed",
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:productId", async function (req, res, next) {
  const { productId } = req.params;
  try {
    const getProduct = await productService.getProduct({ productId });

    res.status(200).json({
      data: getProduct,
      message: "product retrieved",
    });
  } catch (e) {}
});

router.post("/", async function (req, res, next) {
  const { body: product } = req;
  try {
    const createProduct = await productService.createdProduct({ product });

    res.status(201).json({
      data: createProduct,
      message: "products created",
    });
  } catch (e) {
    next(e);
  }
});

router.put("/:productId", async function (req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;
  try {
    const updateProduct = await productService.updateProduct({
      productId,
      product,
    });
    res.status(200).json({
      data: updateProduct,
      message: "products updated",
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:productId", async function (req, res, next) {
  const { productId } = req.params;
  try {
    const deleteProduct = await productService.deleteProduct({ productId });

    res.status(200).json({
      data: deleteProduct,
      message: "products deleted",
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
