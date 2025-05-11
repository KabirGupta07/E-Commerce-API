const router = require("express").Router();

const UserController = require("../controllers/user.controller");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../utils/middlewares/verifyToken");

const userController = new UserController();
//UPDATE
router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, userController.getUser);
//GET All USERS
router.get("/", verifyTokenAndAdmin, userController.getAllUsers);
//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, userController.getUserStats)

// router.get("/")

module.exports = router