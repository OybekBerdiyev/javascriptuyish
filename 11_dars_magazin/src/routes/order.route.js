const {Router} = require("express");
const isAdmin = require("../middlewares/is-admin.middleware");
const isAuth = require("../middlewares/is-auth.middleware");
const { addOrder, getOrder, getOrderProfit } = require("../controllers/order.controller");

const router = Router();

router.post("/order",isAuth,addOrder)
router.get("/order",isAuth,isAdmin,getOrder)

module.exports = router;
