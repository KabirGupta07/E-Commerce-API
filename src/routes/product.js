const router = require("express").Router();
const ProductController = require("../controllers/product.controller");

const productController = new ProductController()
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("../utils/middlewares/verifyToken");


//CREATE
router.post("/", verifyTokenAndAdmin, productController.createProduct)

//UPDATE
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct)

//DELETE
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);

//GET PRODUCT
router.get("/find/:id", productController.getProductById);

//GET All USERS
router.get("/", productController.getProductById);


module.exports = router