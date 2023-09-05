const router = require("express").Router();
const { createProduct, getAllProduct, getOneProduct, updateProduct, deleteProduct, filterProduct } = require("../controllers/product.controller");
const fileUpload = require("../middleware/fileUpload");

router.post("/product",fileUpload,createProduct);
router.get("/product",getAllProduct);
router.get("/filterproduct",filterProduct);
router.get("/product/:id",getOneProduct);
router.put("/product/:id",fileUpload,updateProduct);
router.delete("/product/:id",deleteProduct);

module.exports = router;