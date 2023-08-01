const {Router} = require("express");

const isAuth = require("../middlewares/is-auth.middleware");
const { addTocart, getTocart, removeTocart } = require("../controllers/cart.controller");


const router = Router();

router.post("/cart/:id", isAuth, addTocart);
router.get("/cart",isAuth, getTocart);


module.exports = router;
