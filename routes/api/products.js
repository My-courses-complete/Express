const express = require("express");
const passport = require("passport");

const ProductsService = require("../../services/products");
const validation = require("../../utils/middlewares/validationHandler");
const cacheResponse = require("../../utils/cacheResponse");
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require("../../utils/time");
const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
} = require("../../utils/schema/product");

// JWT strategy
require("../../utils/auth/strategies/jwt");

function productsApi(app) {
  const router = express.Router();
  const productService = new ProductsService();

  app.use("/api/products", router);

  router.get("/", async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
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
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
    const { productId } = req.params;
    try {
      const getProduct = await productService.getProduct({ productId });

      res.status(200).json({
        data: getProduct,
        message: "product retrieved",
      });
    } catch (e) {}
  });

  router.post(
    "/",
    validation(createProductSchema),
    async function (req, res, next) {
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
    }
  );

  router.put(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    validation({ productId: productIdSchema }, "params"),
    validation(updateProductSchema),
    async function (req, res, next) {
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
    }
  );

  router.delete(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
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
    }
  );
}

module.exports = productsApi;
