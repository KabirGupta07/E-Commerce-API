const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("../utils/middlewares/verifyToken");

const orderController = new OrderController()

//CREATE
router.post("/", verifyTokenAndAuthorization, orderController.createOrder);
//UPDATE
router.put("/:id", verifyTokenAndAdmin, orderController.updateOrder);
//DELETE
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);

//GET All
router.get("/", verifyTokenAndAdmin, orderController.getAllOrders);
//GET USER's ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, orderController.getUserOrders);
//GET MONTHLY INCOME 
router.get("/income", verifyTokenAndAdmin, orderController.getMonthlyIncome)


module.exports = router;
