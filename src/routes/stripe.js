const express = requie("express")
const router = express.Router();

const PaymentController = require("../controllers/payment.controller");
const paymentController = new PaymentController();

router.post("/payment", paymentController.createPayment);

module.exports = router;