
const express = require("express")
const router = express.Router()

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("../utils/middlewares/verifyToken");

const CartController = require("../controllers/cart.controller");
const cartController = new CartController()

//CREATE
router.post("/", verifyTokenAndAuthorization, cartController.createCart);
//UPDATE
router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart);
//DELETE
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);
//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, cartController.getUserCart);
//GET All
router.get("/", verifyTokenAndAdmin, cartController.getAllCarts);

module.exports = router;
